import React, { Component } from 'react';
import { View, Dimensions, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';

import Image from 'react-native-scalable-image';

import aboutButton from './images/home_aboutButton.png';
import homeButton from './images/goHomeButton.png';

class AboutScreen extends Component {
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
                    width={Dimensions.get('window').width * 0.4}
                    resizeMode='contain'
                    source={aboutButton}
                    style={{
                        marginTop: 80
                    }} />

                <Text
                    style={{
                        color: '#323232',
                        fontFamily: 'Roboto',
                        fontSize: 28,
                        lineHeight: 35,
                        textAlign: 'justify',
                        paddingHorizontal: 30,
                    }}>
                    {'AssistiveNote is an aid for people who have difficulty reading text in everyday life. Its purpose is to help users take pictures of text they may have trouble reading '
                        + 'in real life, and let them view the text, enlarged, in either Roboto or OpenDyslexic. There is also an option for '
                        + 'text-to-speech if a user finds it more intuitive.'}
                </Text>

                <TouchableOpacity
                    onPress={() => this.props.navigation.navigate('Home')}>
                    <Image
                        width={Dimensions.get('window').width * 0.4}
                        resizeMode='contain'
                        source={homeButton}
                        style={{
                            marginBottom: 80
                        }} />
                </TouchableOpacity>

            </View>
        );
    }
}

export default AboutScreen;