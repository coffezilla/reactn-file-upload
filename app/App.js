import { useState, useRef } from 'react';
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

export default function App() {
	const [form, setForm] = useState({
		file: null,
	});

	// const END_POINT_BASE = 'http://192.168.0.106/api/app';
	const END_POINT_BASE =
		'https://www.bhxsites.com.br/dev/reactn-file-upload/file_upload.php';

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,

			// bug fix for ios
			// https://docs.expo.dev/versions/latest/sdk/imagepicker/#uiimagepickerpresentationstyle
			presentationStyle: 0,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		console.log(result);

		if (!result.cancelled) {
			setForm({ ...form, file: result });
		}
	};

	const handleSubmit = async () => {
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
		{
			/*names of data object should be like this: name, type, uri*/
		}
		// const response = await fetch(my_upload_api.php, {
		// 	method: 'POST',
		// 	body: data,
		// 	headers: {
		// 		'Content-Type': 'multipart/form-data',
		// 	},
		// });

		// let formData = new FormData();
		// formData.append('file', form.file[0]);
		// formData.append('file', { uri: form.file.uri });
		// let formData = new FormData();
		// // formData.append('photo', { uri: localUri, name: filename, type });

		// // console.log('serio', form.file);
		// formData.append('photo', form.file.uri);
		// formData.append('name', 'my_file');

		// console.log('empresa');

		axios(
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
				console.log('sengin', response.data);
				alert('upload feito');
			})
			.catch((error) => {
				console.log('error', error);
			});
	};

	return (
		<View style={styles.container}>
			<Text>Upload file</Text>
			<Text>{JSON.stringify(form, null, 1)}</Text>
			<Button title='Pick an image from camera roll' onPress={pickImage} />
			{form.file && (
				<>
					<Image
						source={{ uri: form.file.uri }}
						style={{ width: 100, height: 100 }}
					/>
					<Button title='upload now' onPress={handleSubmit} />
				</>
			)}
			<StatusBar style='auto' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
