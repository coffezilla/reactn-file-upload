import { useState } from 'react';

import { InputUploadView } from './components/InputUploadView';
import { handlePostPhoto } from './Api/userHandle';

import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
	const [form, setForm] = useState({
		sending: false,
		text: '',
		file: null,
	});

	const handleSubmit = async () => {
		// form state
		setForm({
			...form,
			sending: true,
		});

		// submit form
		await handlePostPhoto(form).then((responsePost) => {
			if (responsePost.data.status === 1) {
				setForm({
					...form,
					sending: false,
					file: null,
					text: '',
				});
			} else {
				alert('some error');
				setForm({
					...form,
					sending: false,
				});
			}
		});
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
					<Text>{JSON.stringify(form.file, null, 1)}</Text>
					{form.file && (
						<Image
							source={{ uri: form.file.uri }}
							style={[styles.placeholder, { backgroundColor: 'whitesmoke' }]}
						/>
					)}

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
