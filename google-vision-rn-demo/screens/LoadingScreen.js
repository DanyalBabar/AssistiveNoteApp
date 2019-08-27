import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ActivityIndicator } from 'react-native'
import firebase from 'firebase';

class LoadingScreen extends Component {

    componentDidMount() {
        this.checkIfLoggedIn();
    }

    checkIfLoggedIn = () => {

        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {
                this.props.navigation.navigate('Home');
            }
            else {
                this.props.navigation.navigate('Login');
            }

        }.bind(this)
        );
    };

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <ActivityIndicator
                    size='large'
                    color='#323232' />
            </View>
        );
    }
}

export default LoadingScreen;