import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions, Text, Alert } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";

import * as firebase from "firebase";

import Image from 'react-native-scalable-image';

import getStarted from './images/login_getStartedButton.png';
import signIn from './images/login_SignInButton.png';
import signUp from './images/login_SignUpButton.png';
import why from './images/login_whyButton.png';
import forgot from './images/signIn_ForgotChangePassword.png'

class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    signUp = (email, password) => {
        try {
            firebase
                .auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    console.log(user);
                }).catch(function (e) {
                    alert(e);
                })
        } catch (error) {
            console.log(error.toString());
        }
    };

    signIn = (email, password) => {
        try {
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(res => {
                    console.log(res.user.email);
                }).catch(function (e) {
                    alert(e);
                })
        } catch (error) {
            console.log(error.toString());
        }
    };

    goForgot = () => {
        const { navigate } = this.props.navigation;
        navigate('Forgot');
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#e3e3e3',
                    flex: 1,
                    justifyContent: 'space-evenly',
                    flexDirection: "column",
                    alignItems: 'center',
                }}>

                <Image
                    width={Dimensions.get('window').width * 0.8}
                    resizeMode='contain'
                    source={getStarted}
                    style={{
                        paddingTop: Dimensions.get('window').height * 0.3,
                        marginBottom: -Dimensions.get('window').height * 0.15
                    }}
                />

                {/* FORM */}
                <View>
                    <Form
                        width={Dimensions.get('window').width * 0.9}
                        style={{
                            paddingTop: -Dimensions.get('window').height * 0.05,
                            paddingBottom: Dimensions.get('window').height * 0.05
                        }}>
                        <Item floatingLabel
                            style={{
                            }}>
                            <Label>Email</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={email => this.setState({ email })}
                            />
                        </Item>
                        <Item floatingLabel>
                            <Label>Password</Label>
                            <Input
                                secureTextEntry={true}
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={password => this.setState({ password })}
                            />
                        </Item>
                    </Form>
                </View>

                {/* SIGNIN & SIGNUP */}
                <View
                    style={{
                        backgroundColor: '#e3e3e3',
                        flexDirection: "row",
                        marginTop: -Dimensions.get('window').height * 0.1,
                        marginBottom: -Dimensions.get('window').height * 0.075
                    }}>

                    <TouchableOpacity
                        onPress={() => this.signUp(this.state.email, this.state.password)}>

                        <Image
                            width={Dimensions.get('window').width * 0.3}
                            resizeMode='contain'
                            source={signUp}
                            style={{
                                marginHorizontal: Dimensions.get('window').width * 0.1
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.signIn(this.state.email, this.state.password)}>
                        <Image
                            width={Dimensions.get('window').width * 0.3}
                            resizeMode='contain'
                            source={signIn}
                            style={{
                                marginHorizontal: Dimensions.get('window').width * 0.1
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={() => this.goForgot()}>

                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={forgot}
                        style={{
                        }}
                    />
                </TouchableOpacity>


                {/* FORGOT & INFO  */}
                <View
                    style={{
                        justifyContent: 'center',
                        flexDirection: "column",
                        alignItems: 'center',
                    }}>


                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={why}
                        style={{
                            paddingBottom: Dimensions.get('window').height * 0.1
                        }}
                    />
                    <Text
                        style={{
                            color: '#323232',
                            fontFamily: 'Roboto',
                            fontWeight: "200",
                            fontSize: 26,
                            lineHeight: 35,
                            textAlign: 'center',
                            paddingHorizontal: Dimensions.get('window').width * 0.1,
                        }}>
                        {'email authentication helps sync your data across your devices'}
                    </Text>
                </View>
            </View>
        );
    }
}

export default LoginScreen;