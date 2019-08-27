import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, Dimensions } from 'react-native';
import firebase from 'firebase';

import * as GoogleSignIn from 'expo-google-sign-in';


import Image from 'react-native-scalable-image';

import getStarted from './images/login_getStartedButton.png';
import signIn from './images/login_signinButton.png';
import why from './images/login_whyButton.png';
import whyInfo from './images/login_whyInfoText.png';

class LoginScreen extends Component {

    isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            var providerData = firebaseUser.providerData;
            for (var i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.getBasicProfile().getId()) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }

    onSignIn = googleUser => {
        var unsubscribe = firebase.auth().onAuthStateChanged(function (firebaseUser) {

            unsubscribe();

            if (!this.isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                var credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken
                );

                firebase
                    .auth()
                    .signInWithCredential(credential)
                    .then(function (result) {
                        if (result.additionalUserInfo.isNewUser) {
                            firebase
                                .database()
                                .ref('/users/' + result.user.uid)
                                .set({
                                    gmail: result.user.email,
                                    first_name: result.additionalUserInfo.profile.given_name,
                                    created_at: Date.now()
                                })
                            global.userId = result.user.uid;
                        }
                        else {
                            if (result.additionalUserInfo.isNewUser) {
                                firebase
                                    .database()
                                    .ref('/users/' + result.user.uid).update({
                                        last_logged_in: Date.now()
                                    })
                                global.userId = result.user.uid;

                            }
                        }
                    })
                    .catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                        console.log(errorCode, errorMessage, email, credential);
                    });
            } else {
                console.log('User already signed-in Firebase.');
            }
        }.bind(this));
    }

    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                this.onSignIn(user);
                return user.accessToken;
            }
        } catch ({ message }) {
            alert('login: Error:' + message);
        }
    };

    componentDidMount() {
        try {
            GoogleSignIn.initAsync({
            });
        } catch ({ message }) {
            alert('GoogleSignIn.initAsync(): ' + message);
        }
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

                <TouchableOpacity
                    onPress={() => this.signInAsync()}
                >
                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={signIn}
                        style={{
                            paddingVertical: 50
                        }}
                    />
                </TouchableOpacity>

                <View>
                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={why}
                        style={{
                        }}
                    />
                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={whyInfo}
                        style={{
                            paddingTop: 125
                        }}
                    />
                </View>
            </View>
        );
    }
}

export default LoginScreen;