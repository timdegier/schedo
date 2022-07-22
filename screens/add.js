import React, { Component } from "react";
import { View, Button, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from '@react-native-community/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from "date-fns";

import styles from '../styling/style.js';

var url = '';

class add extends Component {
  state = {
    title: '',
    description: '',
    date: new Date,
    username: '',
    postedNote: false,
    storage_key: '@save_storage',
  }

  componentDidMount = async () => {
    this.getUsername();

    this.timer = setInterval(() => this.getUsername(),1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  addToDo = ( state, navigation, Alert ) => {
    if(state.title === '' || state.description === ''){
      Alert.alert('Error uploading','Please fill in all fields');
    } else {
      try {
        const response = fetch(url + '/note/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body: `username=${state.username}&title=${state.title}&description=${state.description}&date=${format(state.date, "uuuu-MM-dd HH:mm")}`
        })

        this.props.navigation.navigate('Home');
        Alert.alert('To do added','Your new to do has been added succesfully');

        this.setState({ title: '', description: '' })
      } catch (e) {
        console.log(e);
      }
    }
  }

  getUsername = async () => {
    try {
        const value = await AsyncStorage.getItem(this.state.storage_key);
        if (value !== null) {
          if(this.state.username !== value){
            this.setState({ username: value });
          }
        } else {
          if(this.state.username !== value){
            this.setState({ username: '' })
          }
        }
      } catch (e) {
        console.log(e)
      }
  }

  setDate = (event, date) => {
    date = date || this.state.date;

    this.setState({ date: date });
  };

  render(){
    if(this.state.username === ''){
      return(
        <View style={styles.view}>
          <Text>Please login before uploading your to do</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
          <View style={{margin: 10}}>
            <TextInput
              value={this.state.title}
              onChangeText={(title) => this.setState({ title })}
              keyboardType='default'
              placeholder='Title'
              placeholderTextColor='black'
              style={styles.input}
              />

            <TextInput
              value={this.state.description}
              onChangeText={(description) => this.setState({ description })}
              keyboardType='default'
              placeholder='Description'
              placeholderTextColor='black'
              style={styles.input}
              />

            <DateTimePicker
              onChange={this.setDate}
              value={this.state.date}
              mode="datetime"
              is24Hour={true}
              display="default"
              style={{margin:10}}
              dateFormat={"day month year"}
              minimumDate={new Date()}
              />

            <TouchableOpacity
              style={styles.button}
              onPress={() => this.addToDo(this.state,this.props.navigation,Alert)}>
                <Text style={{color:'#fff'}}>Add to do</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }

  }
}

export default add;
