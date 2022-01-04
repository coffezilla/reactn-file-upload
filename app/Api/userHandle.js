import axios from 'axios';

// https://docs.expo.dev/versions/latest/sdk/imagepicker/
const END_POINT_BASE = 'http://192.168.0.106/api/app';
// const END_POINT_BASE = 'https://www.bhxsites.com.br/dev/reactn-file-upload/file_upload.php';

export const handlePostPhoto = async (form) => {
	let responseRest = { status: 0 };
	let localUri = form.file.uri;
	const filename = localUri.split('/').pop();
	let match = /\.(\w+)$/.exec(filename);
	const type = match ? `image/${match[1]}` : `image`;

	// var
	const formData = new FormData();
	formData.append('file', {
		name: filename,
		type: type,
		uri: form.file.uri,
	});

	console.log('pablo', filename, type, form.file.uri);

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
			console.log('auth', response.data);
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
