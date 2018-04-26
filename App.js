import React from 'react';
import { StyleSheet, Text, View, } from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import Header from './screens/Header'


const firebaseConfig = {
    apiKey: 'AIzaSyB8mpmtGh6Lgrr0vr2lb1bCiPnDe1So1pw',
    authDomain: 'strangerthangz-1.firebaseapp.com',
    databaseURL: 'https://strangerthangz-1.firebaseio.com',
    projectId: 'strangerthangz-1',
    storageBucket: 'strangerthangz-1.appspot.com',
    messagingSenderId: '753924071656'

};

const AppNavigator = StackNavigator({
      LoginScreen: {screen: LoginScreen},
      SignUpScreen: {screen: SignUpScreen},
      HomeScreen: {screen: HomeScreen}
})

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator />
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'mistyrose',
    justifyContent: 'center',
    padding: 10
  },
});
