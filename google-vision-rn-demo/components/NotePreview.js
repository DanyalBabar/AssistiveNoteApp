import React, { Component } from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';

import Image from 'react-native-scalable-image';

class NotePreview extends Component {

    constructor(props) {
        super(props);

        this.state = {
            noteText: this.props.currNoteTxt.replace(/(\r\n|\n|\r)/gm, " "),
            noteImg: this.props.currNoteImg,
            noteId: this.props.noteId
        }
    }

    render() {

        return (
            <View
                style={{
                    minWidth: Dimensions.get('window').width,
                    borderStyle: 'solid',
                    borderColor: '#323232',
                    borderWidth: 2,
                    borderTopWidth: 0
                }}>
                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('ViewNote', {
                        noteImg: this.state.noteImg,
                        noteText: this.props.currNoteTxt,
                        noteKey: this.state.noteId,
                        fromLibrary: true,
                        currSaveState: true
                    })}>
                    <View
                        height={Dimensions.get('window').height * 0.1}
                        backgroundColor='#e3e3e3'
                        style={{
                            flexDirection: 'row',
                        }}>

                        <View
                            style={{
                                borderColor: '#323232',
                                borderRightWidth: 2,
                            }}>
                            <Image
                                source={this.state.noteImg}
                                height={Dimensions.get('window').height * 0.1}
                                style = {{
                                    minWidth: Dimensions.get('window').width * 0.25,
                                    maxWidth: Dimensions.get('window').width * 0.25
                                }}>
                            </Image>
                        </View>
                        <Text
                            numberOfLines={2}
                            style={{
                                flex: 1,
                                lineHeight: 35,
                                color: '#323232',
                                fontFamily: 'Roboto-Bold',
                                fontSize: 23,
                                alignSelf: 'center',
                                paddingRight: 10,
                                padding: 5
                            }}>
                            {this.state.noteText}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}
export default NotePreview;