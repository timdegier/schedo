import React, { Component } from "react";
import { View, Button, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { format } from "date-fns";

import styles from '../styling/style.js';

var url = '';

class home extends Component {
  state = {
    error: false,
    username: '',
    notes: {'0': 'data', 'data': [{id: 0, username: '', title: '', description: '', date: '0000-00-00 00:00:00'}]},
    date: new Date().getDate() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getFullYear(),
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

          this.getNotes(value);
        } else {
          if(this.state.username !== value){
            this.setState({ username: '' })
          }
        }
      } catch (e) {
        console.log(e)
      }
  }

  getNotes = async (username) => {
    if(this.state.username !== ''){
      try {
        const response = await fetch(url + '/note/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body:  `username=${username}`
        })

        const data = await response.json();

        if(typeof data.data !== 'undefined'){
          this.setState({ notes: data })
        } else {
          this.setState({ notes: {'0': 'data', 'data': [{id: 0, username: '', title: '', description: '', date: ''}]} })
        }

      } catch (e) {
        console.log(e);
      }
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
      Alert.alert('Deleted','Succesfully deleted the to do.')

    } catch (e) {
      console.log(e);
    }
  }

  renderNotes = ({id,username,title,description,date}) => {
    const { navigation } = this.props;
    if(id !== 0){
      if(date.slice(0,10) !== format(new Date,'uuuu-MM-dd')){
        return(
          <View key={id}>
            <TouchableOpacity style={styles.note} onPress={() => navigation.navigate('ViewTodo',{ id: id })}>
              <Text style={{fontSize: 20,fontWeight: '700'}}>{title}</Text>
              <Text style={{marginTop: 10}}>{date}</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View key={id}></View>
        )
      }
    } else if(id === 0) {
      return (
        <View key={id}>
          <Text style={{margin:20}}>You have no to do's</Text>
        </View>
      )
    }
  }

  renderNotesToday = ({id,username,title,description,date}) => {
    const { navigation } = this.props;
    if(id !== 0){
      if(date.slice(0,10) === format(new Date,'uuuu-MM-dd')){
        return(
          <View key={id}>
            <TouchableOpacity style={styles.note} onPress={() => navigation.navigate('ViewTodo',{ id: id })}>
              <Text style={{fontSize: 20,fontWeight: '700'}}>{title}</Text>
              <Text style={{marginTop: 10}}>{date}</Text>
            </TouchableOpacity>
          </View>
        )
      } else {
        return (
          <View key={id}></View>
        )
      }
    } else if(id === 0) {
      return (
        <View key={id}>
          <Text style={{margin:20}}>You have no to do's</Text>
        </View>
      )
    }
  }

  noNotesAlert = ({id}) => {
    if(id === 0){
      return(
        <View style={styles.alert} key={id}>
          <Text>Hey there! You have no to do's yet. Lets add some!</Text>
        </View>
      )
    } else {
      return(
        <View key={id}></View>
      )
    }
  }

  render() {
    const date = this.state.date;
    const { navigation } = this.props;
    const { notes } = this.state;

    if(this.state.username !== ''){
      return (
        <View style={styles.view}>
          <ImageBackground style={{width: '100%', height: '100%'}} source={require('../styling/img/background.png')}>
            <ScrollView style={styles.homeView}>
              <View>
                <View style={{margin:30,marginTop: 60,marginBottom: 60}}>
                  <Text style={{color:'#fff',fontSize: 45,fontWeight: '700',marginBottom:20}}>Welcome {this.state.username},</Text>
                  <Text style={{color:'#fff',fontSize: 18}}>Lets start organising!</Text>
                </View>
              </View>

              {this.state.notes.data.map(this.noNotesAlert)}

              <View style={{backgroundColor: '#fff',borderRadius:15,margin: 10}}>
                <View>
                  <View style={{marginTop: 20}}>
                    <Text style={{marginLeft:20, marginBottom:20,fontWeight: '600',fontSize: 20}}>Today:</Text>
                    {this.state.notes.data.map(this.renderNotesToday)}
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={{marginLeft:20, marginBottom:20,fontWeight: '600',fontSize: 20}}>Upcoming:</Text>
                    {this.state.notes.data.map(this.renderNotes)}
                  </View>
                </View>

                <View style={{margin: 10,marginTop: -10}}>
                  <TouchableOpacity style={styles.buttonAdd} onPress={() => navigation.navigate('Add')}>
                    <Text style={{color:'white'}}><Ionicons name="add-circle" size={24} color="white" /></Text>
                  </TouchableOpacity>
                </View>

              </View>

            </ScrollView>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <View style={styles.view}>
          <ImageBackground style={{width: '100%', height: '100%'}} source={require('../styling/img/background.png')}>
            <ScrollView style={styles.homeView}>
              <View>
                <View style={{margin:30,marginTop: 60,marginBottom: 60}}>
                  <Text style={{color:'#fff',fontSize: 45,fontWeight: '700',marginBottom:20}}>Schedo</Text>
                  <Text style={{color:'#fff',fontSize: 18}}>Lets start organising!</Text>
                </View>
              </View>

              <View style={styles.topper4}>
                <Text>Welcome to Schedo, log in or create an account to get started</Text>
              </View>

              <View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}><Text style={{color:'#fff'}}>Click here to login</Text></TouchableOpacity>
              </View>
            </ScrollView>
          </ImageBackground>
        </View>
      );
    }


  }
}

export default home;
