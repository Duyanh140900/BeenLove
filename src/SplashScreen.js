import { Text, View } from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions, NavigationActions } from 'react-navigation';
import { CommonActions } from '@react-navigation/native';

export default class SplashScreen extends Component {
  componentDidMount() {
    this.getStatusLogin();
  }

  getStatusLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('userLogin');
      // value previously stored
      console.log('userLogin', value);
      if (value) {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'BottomBar',
              },
            ],
          }),
        );
      } else {
        this.props.navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Login',
              },
            ],
          }),
        );
      }
    } catch (e) {
      // error reading value
    }
  };
  render() {
    return null;
  }
}
