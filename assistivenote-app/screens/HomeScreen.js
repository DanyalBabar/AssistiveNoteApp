import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import firebase from 'firebase';
import Image from 'react-native-scalable-image';

import appTitle from './images/home_appTitle.png';
import newButton from './images/home_newButton.png';
import savedButton from './images/home_savedButton.png';
import aboutButton from './images/home_aboutButton.png';
import logOutButton from './images/home_logoutButton.png';

class HomeScreen extends Component {
  render() {
    return (
      <View
        style={{
          backgroundColor: '#e3e3e3',
          flex: 1,
          justifyContent: 'space-around',
          flexDirection: "column",
          alignItems: 'center',
        }}>

        <Image
          width={Dimensions.get('window').width * 0.8}
          resizeMode='contain'
          source={appTitle}
          style={{
            marginTop: 50
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewNote')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginRight: 25
            }}>

            <Image
              width={Dimensions.get('window').width * 0.35}
              resizeMode='contain'
              source={newButton}
              style={{
                marginBottom: -10
              }}
            />

            <Text
              style={{
                color: '#323232',
                fontFamily: 'Roboto-Bold',
                fontSize: 45,
                // fontWeight: 'bold',
              }}>
              new
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NoteLibrary')}
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: 25
            }}>
            <Image
              width={Dimensions.get('window').width * 0.35}
              resizeMode='contain'
              source={savedButton}
              style={{
                marginBottom: -10
              }}
            />

            <Text
              style={{
                color: '#323232',
                fontFamily: 'Roboto',
                fontSize: 45,
                fontWeight: 'bold',
              }}>
              saved
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('About')}>
            <Image
              width={Dimensions.get('window').width * 0.4}
              resizeMode='contain'
              source={aboutButton}
              style={{
                marginBottom: 20
              }} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => firebase.auth().signOut()}>
            <Image
              width={Dimensions.get('window').width * 0.4}
              resizeMode='contain'
              source={logOutButton}
              style={{
              }} />
          </TouchableOpacity>

        </View>

      </View>
    );
  }
}

export default HomeScreen;