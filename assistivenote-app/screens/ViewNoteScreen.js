import React, { Component } from 'react';
import { Dimensions, View, Text, StatusBar, ScrollView, TouchableOpacity } from 'react-native';

import * as Speech from 'expo-speech';
import firebase from 'firebase';
import Image from 'react-native-scalable-image';

class ViewNoteScreen extends Component {

  constructor(props) {
    super(props);

    const { navigation } = this.props;

    this.state = {
      user: firebase.auth().currentUser,
      currImage: navigation.getParam('noteImg', 'NoImg'),
      currText: navigation.getParam('noteText', ''),
      noteKey: navigation.getParam('noteKey', ''),
      savedState: navigation.getParam('currSaveState', false),
      fromLibrary: navigation.getParam('fromLibrary', false),
      defaultFont: true
    }
  }

  saveNote = (currUser, img, txt) => {
    this.setState({
      savedState: true
    })

    if (this.state.savedState === false) {
      firebase
        .database()
        .ref('/users/' + currUser.uid + '/notes')
        .push({
          noteImg: img,
          noteTxt: txt,
        })
        .then((snap) => {

          this.setState({
            noteKey: snap.key
          })
        })
    }
  }

  deleteNote = (currUser) => {
    firebase
      .database()
      .ref('/users/' + currUser.uid + '/notes')
      .child('' + this.state.noteKey).remove();

    this.setState({
      savedState: false
    })
  }

  startTextToSpeech = () => {
    Speech.stop();
    Speech.speak(this.state.currText, { rate: 0.9 });
  }

  stopTextToSpeech = () => {
    Speech.stop();
  }

  render() {

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#e3e3e3'
        }}>

        <View
          width={Dimensions.get('window').width}
          style={{
            maxHeight: Dimensions.get('window').height * 0.075,
            backgroundColor: '#323232',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: StatusBar.currentHeight,
          }}>

          <TouchableOpacity
            onPress={this.state.fromLibrary ? () => { Speech.stop(), this.props.navigation.navigate('NoteLibrary') } : () => { Speech.stop(), this.props.navigation.navigate('Home') }}>
            <Text
              style={{
                paddingLeft: 10,
                color: '#e3e3e3',
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingTop: 3
              }}>
              {this.state.fromLibrary ? 'back' : 'home'}
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingRight: 10
            }}>
            <TouchableOpacity
              onPress={() => this.saveNote(this.state.user, this.state.currImage, this.state.currText)}
              disabled={this.state.savedState ? true : false}>
              <Text
                style={{
                  paddingLeft: 10,
                  color: this.state.savedState ? '#696969' : '#e3e3e3',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 35,
                  paddingTop: 3
                }}>
                save
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                paddingLeft: 10,
                color: '#e3e3e3',
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingTop: 3
              }}>
              |
            </Text>

            <TouchableOpacity
              onPress={() => this.deleteNote(this.state.user)}
              disabled={!this.state.savedState ? true : false}
            >
              <Text
                style={{
                  paddingLeft: 10,
                  color: this.state.savedState ? '#e3e3e3' : '#696969',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 35,
                  paddingTop: 3,
                  paddingBottom: 25
                }}>
                delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>



        {/* Note Display */}
        <View
          style={{
            backgroundColor: '#e3e3e3',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>


          <View
            backgroundColor='#323232'
            style={{
              minWidth: Dimensions.get('window').width,
              paddingVertical: 20,
            }}>
            <Image
              source={this.state.currImage}
              height={Dimensions.get('window').height * 0.4}
              style={{
                alignSelf: 'center'
              }}>
            </Image>
          </View>

          {/* Text to Speech Bar */}
          <View
            width={Dimensions.get('window').width}
            style={{
              minHeight: Dimensions.get('window').height * 0.075,
              backgroundColor: '#323232',
              flexDirection: 'row',
              justifyContent: 'center',
              borderColor: '#e3e3e3',
              borderBottomWidth: 3,
              borderTopWidth: 2.5
            }}>

            <TouchableOpacity
              onPress={() => this.startTextToSpeech()}>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#e3e3e3',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 35,
                  paddingBottom: 3
                }}>
                text to speech
            </Text>
            </TouchableOpacity>

            <Text
              style={{
                paddingLeft: 10,
                color: '#e3e3e3',
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingBottom: 3
              }}>
              |
            </Text>

            <TouchableOpacity
              onPress={() => this.stopTextToSpeech()}>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#e3e3e3',
                  fontFamily: 'Roboto-Bold',
                  fontSize: 35,
                  paddingBottom: 2
                }}>
                stop
              </Text>
            </TouchableOpacity>
          </View>

          {/* Font Bar */}
          <View
            width={Dimensions.get('window').width}
            style={{
              maxHeight: Dimensions.get('window').height * 0.075,
              backgroundColor: '#323232',
              flexDirection: 'row',
              justifyContent: 'center',
              borderColor: '#e3e3e3',
              borderBottomWidth: 3
            }}>

            <TouchableOpacity
              onPress={() => this.setState({ defaultFont: true })}>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#e3e3e3',
                  fontFamily: 'Roboto',
                  fontSize: 35,
                  paddingBottom: 3
                }}>
                Roboto
            </Text>
            </TouchableOpacity>

            <Text
              style={{
                paddingLeft: 10,
                color: '#e3e3e3',
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingBottom: 3
              }}>
              |
            </Text>

            <TouchableOpacity
              onPress={() => this.setState({ defaultFont: false })}>
              <Text
                style={{
                  paddingLeft: 10,
                  color: '#e3e3e3',
                  fontFamily: 'OpenDyslexic',
                  fontSize: 30,
                  paddingBottom: 5
                }}>
                OpenDyslexic
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView>
            <View>
              <Text
                style={{
                  flex: 1,
                  flexWrap: 'wrap',
                  fontFamily: this.state.defaultFont ? 'Roboto' : 'OpenDyslexic',
                  fontSize: this.state.defaultFont ? 25 : 20,
                  padding: 10,
                  textAlign: 'left',
                  paddingBottom: 60
                }}>{this.state.currText}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ViewNoteScreen;