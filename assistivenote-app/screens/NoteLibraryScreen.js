import React, { Component } from 'react';
import { View, Text, Dimensions, StatusBar, Button, TouchableOpacity } from 'react-native';
import firebase from 'firebase';

import NotePreview from '../components/NotePreview';
import { ScrollView } from 'react-native-gesture-handler';

class NoteLibraryScreen extends Component {

  constructor(props) {
    super(props);

    let returnArr = [];

    firebase
      .database()
      .ref('/users/' + firebase.auth().currentUser.uid + '/notes')
      .once('value')
      .then(snapshot => {

        snapshot.forEach(childSnapshot => {
          let item = childSnapshot.val();
          item.key = childSnapshot.key;

          returnArr.push(item);
        })

        this.setState({
          noteData: returnArr.reverse()
        })
      })

    this.state = {
      noteData: returnArr
    }
  }

  render() {

    const notes = this.state.noteData;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#e3e3e3',
          flexDirection: "column",
          alignItems: 'center',
        }} >

        {/* Header */}
        < View
          width={Dimensions.get('window').width}
          style={{
            maxHeight: Dimensions.get('window').height * 0.075,
            backgroundColor: '#323232',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: StatusBar.currentHeight,
          }}>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Home')}>
            <Text
              style={{
                paddingLeft: 10,
                color: '#e3e3e3',
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingBottom: 3,
                paddingLeft: 10
              }}>
              home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('NewNote')}>
            <Text
              style={{
                color: '#e3e3e3',
                paddingLeft: 10,
                fontFamily: 'Roboto-Bold',
                fontSize: 35,
                paddingBottom: 3,
                paddingRight: 10
              }}>
              new note
              </Text>
          </TouchableOpacity>
        </View >

        <ScrollView>
          {notes.map(note => {
            return <NotePreview
              navigation = {this.props.navigation}
              currNoteImg={note.noteImg}
              currNoteTxt={note.noteTxt}
              noteId={note.key}
            />
          })}
        </ScrollView>

      </View >
    );
  }
}

export default NoteLibraryScreen;