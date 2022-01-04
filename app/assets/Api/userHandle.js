import axios from 'axios';

// POST
export const sendContact = async (
	userEmail,
	userName,
	userPhone,
	userMessage,
	userNeedInstallment,
	userCity,
	userFiles1,
	userFiles2,
	userFiles3
) => {
	let serverResponse = { data: { status: 0 } };
	const formData = new FormData();
	formData.append('email', userEmail);
	formData.append('name', userName);
	formData.append('phone', userPhone);
	formData.append('message', userMessage);
	formData.append('installment', userNeedInstallment);
	formData.append('city', userCity);
	formData.append('attachment1', userFiles1[0]);
	formData.append('attachment2', userFiles2[0]);
	formData.append('attachment3', userFiles3[0]);

	//
	// prettier-ignore
	const END_POINT = '/medidor-papel-de-parede/api/send-message';
	await axios(
		{
			method: 'post',
			url: END_POINT,
			data: formData,
		},
		{
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}
	)
		.then((response) => {
			serverResponse = {
				data: {
					status: response.data.status,
					message: response.data.message,
				},
			};
		})
		.catch(() => {});
	return serverResponse;
};

export const fullname = () => {
	'my name is Joelba';
};
