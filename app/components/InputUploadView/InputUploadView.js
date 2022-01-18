import { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as ImagePicker from 'expo-image-picker';

import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

// IOS resize image: https://github.com/bamlab/react-native-image-resizer

export const InputUploadView = ({ form, name, setForm, onSubmit }) => {
	// tira a foto e salva os dados
	// take photo using the phone
	const handleTakePhoto = async () => {
		console.log('handleTakePhoto');
		// No permissions request is necessary for launching the image library
		const responseFile = await ImagePicker.launchCameraAsync({
			presentationStyle: 0,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 0.3,
		});

		if (!responseFile.cancelled) {
			console.log('deseh', responseFile);
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
		console.log('1');
		const responseFile = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			presentationStyle: 0,
			allowsEditing: true,
			aspect: [2,1],
			quality: 0.3,
		});

		console.log('2');

		if (!responseFile.cancelled) {
			console.log('3');
			setForm({
				...form,
				[name]: responseFile,
			});
		}

		console.log('4');
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
			{/* <Image
				source={{ uri: form[name].uri }}
				style={[styles.placeholder, { backgroundColor: 'whitesmoke' }]}
			/> */}

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

const styles = StyleSheet.create({
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
