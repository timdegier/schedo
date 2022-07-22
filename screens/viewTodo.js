import React, { Component } from "react";
import { View, Button, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

import styles from '../styling/style.js';

var url = '';

class viewTodo extends Component {
  state = {
    id: this.props.route.params.id,
    title: '',
    description: '',
    date: '',
    username: '',
    storage_key: '@save_storage',
  }

  componentDidMount = async () => {
    this.getUsername();

    this.timer = setInterval(() => this.getUsername(),500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getUsername = async () => {
    try {
        const value = await AsyncStorage.getItem(this.state.storage_key);
        if (value !== null) {
          if(this.state.username !== value){
            this.setState({ username: value });
          }

          this.getNote();
        } else {
          if(this.state.username !== value){
            this.setState({ username: '' })
          }
        }
      } catch (e) {
        console.log(e)
      }
  }

  getNote = async () => {
    try {
      const response = await fetch(url + '/note/single', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body:  `id=${this.state.id}`
      })

      const data = await response.json();

      if(typeof data !== 'undefined'){
        var allData = data.data[0];
        this.setState({ title: allData.title, description: allData.description, date: allData.date })
      }

    } catch (e) {
      console.log(e);
    }
  }

  removeTodo = async (id,navigation,Alert) => {
    try {
      const response = await fetch(url + '/note/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
        },
        body:  `id=${id}`
      })

      const data = await response.json();
      console.log(data);
      navigation.navigate('Home');
      Alert.alert('Deleted','Succesfully deleted the note.')

    } catch (e) {
      console.log(e);
    }
  }

  render(){
    const params = this.props.route.params;
    const { navigation } = this.props;

    return(
      <View style={styles.view}>
        <View style={styles.viewNote}>
            <View style={{margin: 10,borderBottomWidth: 1, borderBottomColor: '#eee'}}>
              <View style={{margin: 10}}>
                <Text style={{margin: 10}}>{this.state.title}</Text>
              </View>
            </View>
            <View style={{margin:10,padding:20,paddingBottom:40,borderBottomColor: '#eee',borderBottomWidth: 1,}}>
              <Text>{this.state.description}</Text>
              <Text style={{fontWeight: '700',marginTop: 20}}>{this.state.date}</Text>
            </View>

            <TouchableOpacity onPress={() => this.removeTodo(this.state.id,navigation,Alert)} style={styles.buttonBack}>
              <Text style={{color:'white'}}>Remove to do/note</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.buttonBack}>
              <Text style={{color: '#fff'}}>Back to home</Text>
            </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default viewTodo;
