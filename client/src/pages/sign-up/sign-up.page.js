import React, {useState} from 'react';

import {useNavigate, useParams} from 'react-router-dom';

import FormInput from '../../components/form-input/form-input.component' 
import CustomButton from '../../components/custom-buttons/custom-button.component';

import { TitleContainer, SignUpContainer, ButtonsContainer } from './sign-up-page.styles';

const SignUpPage = () => {
	const navigate = useNavigate()
	const traderID = useParams().traderID;

	const [userCredentials, setUserCredentials] = useState({
        first_name: "",
        last_name: "",
		phone_number: "",
		cell_phone_number: "",
		email_address: "",
		street_address: "",
		city: "",
		state: "",
		zip_code: "",
		ethereum_address: "",
    });

	const {
		first_name,
		last_name,
		phone_number,
		cell_phone_number,
		email_address,
		street_address,
		city,
		state,
		zip_code,
		ethereum_address
	} = userCredentials;

	const handleSubmit = event => {
		event.preventDefault();
		console.log(event, 1);
		// Send login request to the server
		fetch(`http://localhost:3002/setup/${traderID}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({userCredentials}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				if(data.success) {
					alert("set up successfully")
					navigate('/')
				} else {
					alert("your password or username is invalid")
				}
				console.log(data.result[0].trader_id);
				// Handle the login response accordingly
				// For simplicity, just logging the response to the console
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};

	const handleChange = event => {
		const {name, value} = event.target;
		setUserCredentials({...userCredentials, [name]: value});
	};

	return (
		<SignUpContainer>
			<TitleContainer>
                Sign up 
			</TitleContainer>
			<form onSubmit={handleSubmit}>
				<FormInput
					handleChange={handleChange}
					label='first name'
					name='first_name'
					type='text'
					value={first_name}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='last name'
					name='last_name'
					type='text'
					value={last_name}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='phone number'
					name='phone_number'
					type='text'
					value={phone_number}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='cell phone number'
					name='cell_phone_number'
					type='text'
					value={cell_phone_number}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='email address'
					name='email_address'
					type='text'
					value={email_address}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='street address'
					name='street_address'
					type='text'
					value={street_address}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='city'
					name='city'
					type='text'
					value={city}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='state'
					name='state'
					type='text'
					value={state}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='zip code'
					name='zip_code'
					type='text'
					value={zip_code}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='ethereum address'
					name='ethereum_address'
					type='text'
					value={ethereum_address}
					required
				/>

				<ButtonsContainer>
					<CustomButton type='submit'>Sign UP</CustomButton>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	);
};

export default SignUpPage;

