import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';



const firebaseConfig = {
    apiKey: 'AIzaSyB8mpmtGh6Lgrr0vr2lb1bCiPnDe1So1pw',
    authDomain: 'strangerthangz-1.firebaseapp.com',
    databaseURL: 'https://strangerthangz-1.firebaseio.com',
    projectId: 'strangerthangz-1',
    storageBucket: 'strangerthangz-1.appspot.com',
    messagingSenderId: '753924071656'

};

firebase.initializeApp(firebaseConfig);

import {Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {


  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
    })
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user != null)
      {
        console.log(user)
    }
  })
}

  signUpUser = (email, password) => {

    try{
      if(this.state.password.length < 6){
        alert("Please enter at least 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)

    }
    catch(error){
      console.log(error.toString())
    }

  }

  loginUser = (email, password) => {

    try{
    
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log(user)
      })

    }
    catch(error){
      console.log(error.toString())
    }


  }

async logInWithFacebook(){

  const {type, token} = await Expo.Facebook.logInWithReadPermissionsAsync
  ('1803316826394961', {permissions: ['public_profile'] })
  if (type == 'sucess') {

    const credential = firebase.auth.FacebookAuthProvider.credential(token)

      firebase.auth().signInWithCredentials(credential).catch((error) => {
        console.log(error)

      })
  }
}

  render() {
    return (
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button style={{marginTop:10}}
            full
            rounded
            sucess
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
          <Text style={{color: 'white'}}> Login </Text>

          </Button>

           <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.signUpUser(this.state.email, this.state.password)}
          >
          <Text style={{color: 'white'}}> Sign Up </Text>

          </Button>

          <Button style={{marginTop:10}}
            full
            rounded
            primary
            onPress={() => this.loginWithFacebook}
          >
          <Text style={{color: 'white'}}> Login With Facebook </Text>

          </Button>
        </Form>
      </Container>
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
