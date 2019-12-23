import React, { Component } from 'react';
import { View, TouchableOpacity, Dimensions} from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";

import * as firebase from "firebase";

import Image from 'react-native-scalable-image';

import back from './images/BackButton.png';
import send from './images/SendToReset.png';

class ForgotScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            resetEmail: ""
        };
    }

    goBack = () => {
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    forgotPassword = (Email) => {
        
        const {navigate} = this.props.navigation;
        
        firebase.auth().sendPasswordResetEmail(Email)
            .then(function (user) {
                alert('Please check your email')
                navigate('Login');
            }).catch(function (e) {
                alert(e);
            })
    }

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#e3e3e3',
                    flex: 1,
                    justifyContent: 'flex-start',
                    flexDirection: "column",
                    alignItems: 'center',

                }}>

                <TouchableOpacity
                    onPress={() => this.goBack()}>
                    <Image
                        width={Dimensions.get('window').width * 0.2}
                        resizeMode='contain'
                        source={back}
                        style={{
                            paddingTop: 170,
                            marginRight: 320
                        }}
                    />
                </TouchableOpacity>

                <View>
                    <Form
                        width={Dimensions.get('window').width * 0.9}
                        style={{
                            paddingBottom: 50,
                            marginTop: 150,
                        }}>
                        <Item floatingLabel
                            style={{
                            }}>
                            <Label>Email</Label>
                            <Input
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={email => this.setState({resetEmail: email})}
                            />
                        </Item>
                    </Form>
                </View>

                <TouchableOpacity
                    onPress={() => this.forgotPassword(this.state.resetEmail)}>
                    <Image
                        width={Dimensions.get('window').width * 0.8}
                        resizeMode='contain'
                        source={send}
                        style={{
                        }}
                    />
                </TouchableOpacity>

            </View >
        );
    }
}

export default ForgotScreen;