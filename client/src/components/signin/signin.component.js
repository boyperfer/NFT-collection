import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-buttons/custom-button.component';

import {
	SignInContainer,
	TitleContainer,
	ButtonsContainer,
} from './signin.styles';
import {setCurrentUser} from '../../redux/user/user.actions';
import {selectUsers} from '../../redux/user/user.selectors';

const SignIn = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const users = useSelector(selectUsers)

	const [userCredentials, setUserCredentials] = useState({
		username: '',
		password: '',
	});

	const {username , password} = userCredentials;

	const handleSubmit = event => {
		event.preventDefault();
		console.log(event, 1);
		// Send login request to the server
		fetch('http://localhost:3002/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password}),
		})
			.then(response => response.json())
			.then(data => {
				console.log(data)
				if(data.success) {
					const newUser = users[data.result[0].trader_id]
					newUser['balance'] = data.result[0].balance
					newUser['ethereum_balance'] = data.result[0].ethereum_balance
					dispatch(setCurrentUser(newUser))	
					navigate('/')
				} else {
					alert("your username or password is incorrect")
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
		<SignInContainer>
			<TitleContainer>I already have an account</TitleContainer>
			<TitleContainer>
                Sign in with your email and password
			</TitleContainer>
			<form onSubmit={handleSubmit}>
				<FormInput
					handleChange={handleChange}
					label='username'
					name='username'
					type='username'
					value={username}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='password'
					name='password'
					type='password'
					value={password}
					required
				/>
				<ButtonsContainer>
					<CustomButton type='submit'>Sign IN</CustomButton>
				</ButtonsContainer>
			</form>
		</SignInContainer>
	);
};

export default SignIn;
