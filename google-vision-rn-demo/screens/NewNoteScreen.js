import React, { Component } from 'react';
import {
	Dimensions,
	TouchableOpacity,
	ActivityIndicator,
	Text,
	View
} from 'react-native';

import Image from 'react-native-scalable-image';

import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';

import uuid from 'uuid';
import Environment from '../configuration/environment.js';
import * as firebase from 'firebase';

import newNoteTitle from './images/newNote_title.png';
import cameraButton from './images/newNote_cameraButton.png';
import cameraRollButton from './images/newNote_cameraRollButton.png';
import homeButton from './images/goHomeButton.png';

class NewNoteScreen extends Component {
	state = {
		image: null,
		uploading: false,
		googleResponse: null,
	};

	async componentDidMount() {
		await Permissions.askAsync(Permissions.CAMERA_ROLL);
		await Permissions.askAsync(Permissions.CAMERA);
	}

	render() {

		if (this.state.uploading === true) {
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
			)
		}

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
					width={Dimensions.get('window').width * 0.6}
					resizeMode='contain'
					source={newNoteTitle}
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
						onPress={() => this._takePhoto()}
						style={{
							flexDirection: 'column',
							alignItems: 'center',
							marginRight: 25
						}}>

						<Image
							width={Dimensions.get('window').width * 0.35}
							resizeMode='contain'
							source={cameraButton}
							style={{
								marginBottom: -10
							}}
						/>
						<Text
							style={{
								color: '#323232',
								fontFamily: 'Roboto-Bold',
								paddingTop: 20,
								fontSize: 45,
								lineHeight: 40,
								textAlign: 'center'
							}}>
							{'take\nphoto'}
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => this._pickImage()}
						style={{
							flexDirection: 'column',
							alignItems: 'center',
							marginLeft: 25
						}}>
						<Image
							width={Dimensions.get('window').width * 0.35}
							resizeMode='contain'
							source={cameraRollButton}
							style={{
								marginBottom: -10
							}}
						/>

						<Text
							style={{
								color: '#323232',
								fontFamily: 'Roboto-Bold',
								paddingTop: 15,
								fontSize: 45,
								lineHeight: 40,
								textAlign: 'center'
							}}>
							{'camera\nroll'}
						</Text>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					onPress={() => this.props.navigation.navigate('Home')}>
					<Image
						width={Dimensions.get('window').width * 0.4}
						resizeMode='contain'
						source={homeButton}
						style={{
						}} />
				</TouchableOpacity>

			</View>
		);
	}

	_takePhoto = async () => {
		let pickerResult = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
		});

		this._handleImagePicked(pickerResult);
	};

	_pickImage = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});

		this._handleImagePicked(pickerResult);
	};

	_handleImagePicked = async pickerResult => {
		try {
			this.setState({ uploading: true });

			if (!pickerResult.cancelled) {
				uploadUrl = await uploadImageAsync(pickerResult.uri);
				this.setState({ image: uploadUrl });
				this.submitToGoogle();
			}
		} catch (e) {
			console.log(e);
			alert('Upload failed.');
		} finally {
			this.setState({ uploading: false });
		}
	};

	submitToGoogle = async () => {
		try {
			this.setState({ uploading: true });
			let { image } = this.state;
			let body = JSON.stringify(
				{
					requests: [
						{
							features: [
								{ type: 'TEXT_DETECTION', 'maxResults': 1 },
							],
							image: {
								source: {
									imageUri: image
								}
							}
						}
					]
				});
			let response = await fetch(
				'https://vision.googleapis.com/v1/images:annotate?key=' +
				Environment['GOOGLE_CLOUD_VISION_API_KEY'],
				{
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json'
					},
					method: 'POST',
					body: body
				}
			);
			let responseJson = await response.json();


			this.setState({
				googleResponse: responseJson,
			});

			let imgText = this.state.googleResponse.responses[0].fullTextAnnotation.text;

			this.setState({
				foundText: imgText,
				currImg: image,
			});

			this.props.navigation.navigate('ViewNote', {
				noteImg: { uri: image },
				noteText: this.state.foundText,
				defaultFont: false
			})

		} catch (error) {
			console.log(error);
		}
	};
}

async function uploadImageAsync(uri) {
	const blob = await new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.onload = function () {
			resolve(xhr.response);
		};
		xhr.onerror = function (e) {
			console.log(e);
			reject(new TypeError('Network request failed'));
		};
		xhr.responseType = 'blob';
		xhr.open('GET', uri, true);
		xhr.send(null);
	});

	const ref = firebase
		.storage()
		.ref()
		.child(uuid.v4());
	const snapshot = await ref.put(blob);

	blob.close();

	return await snapshot.ref.getDownloadURL();
}


export default NewNoteScreen;