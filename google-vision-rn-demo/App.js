import React, { Component } from 'react';
import {  createSwitchNavigator, createAppContainer} from 'react-navigation';

import HomeScreen from './screens/HomeScreen.js';
import NewNoteScreen from './screens/NewNoteScreen.js';
import ViewNoteScreen from './screens/ViewNoteScreen.js';
import LoadingScreen from './screens/LoadingScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import NoteLibraryScreen from './screens/NoteLibraryScreen.js';
import AboutScreen from './screens/AboutScreen.js';
import ForgotScreen from './screens/ForgotScreen.js'

import * as firebase from 'firebase';
import {firebaseConfig} from './configuration/config.js'

import robotoReg from './fonts/Roboto-Regular.ttf';
import robotoBold from './fonts/Roboto-Bold.ttf';
import openDysl   c from './fonts/OpenDyslexic-Regular.otf'

import * as Font from 'expo-font'

firebase.initializeApp(firebaseConfig);
 
const AppSwitchNavigator = createSwitchNavigator({
  Loading: {screen: LoadingScreen},
  Home: {screen: HomeScreen},
  NewNote: { screen: NewNoteScreen },
  ViewNote: { screen: ViewNoteScreen },
  Login: {screen: LoginScreen},
  NoteLibrary: {screen: NoteLibraryScreen},
  About: {screen: AboutScreen},
  Forgot: {screen: ForgotScreen}
});

const AppContainer = createAppContainer(AppSwitchNavigator);

class App extends Component { 

  async componentDidMount() {
    await Font.loadAsync({
        'Roboto': (robotoReg),
        'Roboto-Bold': (robotoBold),
        'OpenDyslexic': (openDyslexic)
    }) 
  }

  render() {
    return <AppContainer />;
  }
}
export default App;