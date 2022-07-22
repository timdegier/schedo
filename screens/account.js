import React, { Component, useState } from "react";
import { View, TouchableOpacity, Text, TextInput, Alert } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from '../styling/style.js';

var url = '';

const login = async ( state, navigation, Alert ) => {
    try {
        const response = await fetch(url + '/user/get', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
          },
          body:  `username=${state.i_username}&password=${state.i_password}`
        })

        const data = await response.json();

        console.log(data);
        if(data.username == state.i_username){
            setUsername(state,navigation)
        }
      } catch (e) {
        Alert.alert('Login Failed','Please check your credentials');
      }
}

const setUsername = async ( state, navigation ) => {
    try {
        await AsyncStorage.setItem(
            state.storage_key,
            state.i_username
        );
        console.log('Data saved');
    } catch (error) {
        console.log('Error saving data');
    }
}

class account extends Component {
    state = {
        error: false,
        storage_key: '@save_storage',
        username: '',
        i_username: '',
        i_password: '',
    }

    componentDidMount = () => {
        this.timer = setInterval(() => this.getUsername(),100);
    }

    getUsername = async () => {
        try {
            const value = await AsyncStorage.getItem(this.state.storage_key);
            if (value !== null) {
                this.setState({ username: value });
            } else {
                this.setState({ username: '' })
            }
          } catch (error) {

          }
    }

    render(){
        if(this.state.username === ''){
            return(
                <View style={styles.view}>
                    <View style={styles.topperAccount}>
                        <Text style={{color:'#fff'}}>
                            Login
                        </Text>
                    </View>
                    <View>
                    <TextInput
                        value={this.state.i_username}
                        onChangeText={(i_username) => this.setState({ i_username })}
                        keyboardType='default'
                        placeholder='Username'
                        placeholderTextColor='black'
                        style={styles.input}
                        />
                    <TextInput
                        value={this.state.i_password}
                        onChangeText={(i_password) => this.setState({ i_password })}
                        placeholder='Password'
                        secureTextEntry={true}
                        placeholderTextColor = 'black'
                        style={styles.input}
                        />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => login(this.state,this.props.navigation,Alert)}
                        >
                            <Text style={{color:'#fff'}}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return(
                <View style={styles.view}>
                    <View style={styles.topperAccount}>
                        <Text style={{color:'#fff'}}>This is your account: {this.state.username}</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.button} onPress={() => {
                            AsyncStorage.setItem(
                            this.state.storage_key,
                            ''
                            );
                            this.setState({username: ''});
                        }}>
                            <Text style={{color:'#fff'}}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}

export default account;
