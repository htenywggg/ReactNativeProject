import React, { Component } from 'react';
import {
	View,
	Text,
	StyleSheet
} from 'react-native';
import * as firebase from 'firebase';
import {StackNavigator} from 'react-navigation';
import {Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


class LoginScreen extends Component {

static navigationOptions = {header: 'Header'}


  constructor(props){
    super(props)

    this.state= ({
      email: '',
      password: ''
    });
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

  	const { navigate } = this.props.navigation;

    try{
    
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        console.log("Logged In")
        navigate('HomeScreen')
      })

    }
    catch(error){
      console.log(error.toString())
    }


  }


  render() {
  	const {navigate} = this.props.navigation;
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
            success
            onPress={() => this.loginUser(this.state.email, this.state.password)}
          >
          <Text style={{color: 'white'}}> Login </Text>

          </Button>

           <Button style={{marginTop:10}}
            full
            rounded
            primary
            bordered
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          >
          <Text style={{color: 'white'}}> Sign Up </Text>

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

export default LoginScreen;