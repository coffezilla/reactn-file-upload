import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Button,
	Pressable,
	Switch,
	SafeAreaView,
} from 'react-native';

// https://docs.expo.dev/versions/latest/sdk/imagepicker/
const END_POINT_BASE = 'http://192.168.0.106/api/app';
// const END_POINT_BASE = 'https://www.bhxsites.com.br/dev/reactn-file-upload/file_upload.php';

const InputUploadView = ({ form, name, setForm, onSubmit }) => {
	// tira a foto e salva os dados
	// take photo using the phone
	const handleTakePhoto = async () => {
		console.log('handleTakePhoto');
		// No permissions request is necessary for launching the image library
		const responseFile = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			quality: 1,
		});

		// const result = await ImagePicker.getCameraPermissionsAsync();
		// if (!result.granted) {
		// 	console.log(result);
		// 	alert('need access to gallery for this app to work');
		// }

		if (!responseFile.cancelled) {
			setForm({
				...form,
				[name]: responseFile,
			});
		} else {
		}
	};

	// opens local gallery
	const handleGetPhoto = async () => {
		// No permissions request is necessary for launching the image library
		const responseFile = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			presentationStyle: 0,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!responseFile.cancelled) {
			setForm({
				...form,
				[name]: responseFile,
			});
		}
	};

	// cancel upload
	const handleCancelFile = () => {
		setForm({
			...form,
			[name]: null,
		});
	};

	// asking for permission gallery and camera
	const requestPermissions = async () => {
		try {
			const { status } =
				await ImagePicker.requestMediaLibraryPermissionsAsync();
			setHasPickerPermission(status === 'granted');
		} catch (error) {}
		try {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			setHasCameraPermission(status === 'granted');
		} catch (error) {}
	};

	useEffect(() => {
		requestPermissions();
	}, []);

	if (form.sending) {
		return (
			<View style={styles.fileLoading}>
				<Text style={styles.fileLoadingText}>Enviando...</Text>
			</View>
		);
	}

	// empty value
	if (form[name] === null) {
		return (
			<>
				<Pressable
					style={[styles.button, { marginBottom: 17 }]}
					onPress={handleTakePhoto}
				>
					<Text style={styles.buttonText}>TIRAR FOTO</Text>
				</Pressable>
				<Pressable style={styles.button} onPress={handleGetPhoto}>
					<Text style={styles.buttonText}>CARREGAR DA GALERIA</Text>
				</Pressable>
			</>
		);
	}

	return (
		<>
			<Image
				source={{ uri: form[name].uri }}
				style={[styles.placeholder, { backgroundColor: 'whitesmoke' }]}
			/>

			<Pressable
				style={[styles.buttonCancel, { marginBottom: 17 }]}
				onPress={handleCancelFile}
			>
				<Text style={styles.buttonCancelText}>CANCELAR FOTO</Text>
			</Pressable>
			<Pressable style={styles.button} onPress={onSubmit}>
				<Text style={styles.buttonText}>FAZER UPLOAD</Text>
			</Pressable>
		</>
	);
};

export default function App() {
	const [form, setForm] = useState({
		sending: false,
		text: '',
		file: null,
	});

	const handleSubmit = async () => {
		setForm({
			...form,
			sending: true,
		});

		await handlePostPhoto(form).then((responsePost) => {
			if (responsePost.data.status === 1) {
				setForm({
					...form,
					sending: false,
					file: null,
					text: '',
				});
			} else {
				setForm({
					...form,
					sending: false,
				});
			}
		});
	};

	const handlePostPhoto = async (form) => {
		let responseRest = { status: 0 };
		// preparing file input

		let localUri = form.file.uri;
		const filename = localUri.split('/').pop();
		// Infer the type of the image
		let match = /\.(\w+)$/.exec(filename);
		const type = match ? `image/${match[1]}` : `image`;

		const formData = new FormData();
		formData.append('file', {
			name: filename,
			type: type,
			uri: form.file.uri,
		});

		await axios(
			{
				url: END_POINT_BASE + '/file-upload',
				method: 'POST',
				data: formData,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		)
			.then((response) => {
				if (response.data.status === 1) {
					responseRest = {
						data: {
							status: 1,
						},
					};
				} else {
					responseRest = {
						data: {
							status: 0,
						},
					};
				}
			})
			.catch((error) => {
				responseRest = {
					data: {
						status: 0,
					},
				};
			});

		return responseRest;
	};

	return (
		<View style={styles.container}>
			<View style={styles.innerContainer}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
					}}
				>
					{/* <Text>{JSON.stringify(form, null, 1)}</Text> */}
					<InputUploadView
						form={form}
						setForm={setForm}
						name='file'
						onSubmit={handleSubmit}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 23,
		margin: 17,
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	innerContainer: {
		flex: 1,
		width: '100%',
	},
	button: {
		backgroundColor: '#9013FE',
		width: '100%',
		height: 45,
		justifyContent: 'center',
		borderRadius: 8,
	},
	buttonCancel: {
		backgroundColor: 'whitesmoke',
		width: '100%',
		height: 45,
		justifyContent: 'center',
		borderRadius: 8,
	},
	buttonText: {
		color: 'white',
		textAlign: 'center',
		fontSize: 17,
	},
	buttonCancelText: {
		color: '#9013FE',
		textAlign: 'center',
		fontSize: 17,
	},
	placeholder: {
		height: 330,
		maxWidth: '100%',
		aspectRatio: 1 / 1,
		resizeMode: 'contain',
		borderRadius: 8,
		marginBottom: 17,
	},
	fileLoading: {
		backgroundColor: 'whitesmoke',
		width: '100%',
		height: 45,
		justifyContent: 'center',
		borderRadius: 8,
	},
	fileLoadingText: {
		color: '#9013FE',
		textAlign: 'center',
		fontSize: 17,
	},
});
