import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions } from 'react-native';
import firebase from 'firebase';

import Image from 'react-native-scalable-image';

import getStarted from './images/login_getStartedButton.png';
import signIn from './images/login_SignInButton.png';
import signUp from './images/login_SignUpButton.png';
import why from './images/login_whyButton.png';

class SignUpScreen extends Component {

    goHome = () => {
        const { navigate } = this.props.navigation;
        navigate('Home');
    }

    goExistingUser = () => {
        const { navigate } = this.props.navigaation;
        navigate('ExistingUser');
    }

    goSignUp = () => {
        const { navigate } = this.props.navigaation;
        navigate('SignUp');
    }

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
                    source={getStarted}
                    style={{
                        paddingVertical: 50
                    }}
                />

                <View
                    style={{
                        backgroundColor: '#e3e3e3',
                        flex: 1,
                        justifyContent: 'space-around',
                        flexDirection: "row",
                        alignItems: 'center',

                    }}>

                    <TouchableOpacity
                        onPress={() => this.goExistingUser()}
                    >
                        <Image
                            width={Dimensions.get('window').width * 0.4}
                            resizeMode='contain'
                            source={signIn}
                            style={{
                                paddingVertical: 50
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.goSignUp()}
                    >
                        <Image
                            width={Dimensions.get('window').width * 0.4}
                            resizeMode='contain'
                            source={signUp}
                            style={{
                                paddingVertical: 50
                            }}
                        />
                    </TouchableOpacity>

                </View>

                <View>
                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={why}
                        style={{
                        }}
                    />
                    <Text
                        style={{
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontSize: 28,
                            lineHeight: 35,
                            textAlign: 'justify',
                            paddingHorizontal: 30,
                        }}>
                        {'email authentication helps sync your data across your devices'}
                    </Text>
                </View>
            </View >
        );
    }
}

export default SignUpScreen;