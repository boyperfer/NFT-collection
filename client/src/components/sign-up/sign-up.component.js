import React, {useState} from 'react';
import { useNavigate } from 'react-router';

import FormInput from '../form-input/form-input.component' 
import CustomButton from '../custom-buttons/custom-button.component';

import { TitleContainer, SignUpContainer, ButtonsContainer } from './sign-up.styles';

const SignUp = () => {
	const navigate = useNavigate();

	const [userCredentials, setUserCredentials] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

	const {username, password, confirmPassword} = userCredentials;

	const handleSubmit = event => {
		event.preventDefault();
		console.log(event, 1);
		// Send login request to the server
		fetch('http://localhost:3002/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({username, password}),
		})
			.then(response => response.json())
			.then(data => {
				if(data.success) {
					alert("sign up successfully")
					navigate(`/signup/${data.result[0].trader_id}`)
				} else {
					alert("your username is unavailable")
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
			<TitleContainer className="title">
                I do not have an account
            </TitleContainer>
			<TitleContainer>
                Sign up 
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
				<FormInput
					handleChange={handleChange}
					label='confirm password'
					name='confirmPassword'
					type='password'
					value={confirmPassword}
					required
				/>
				<ButtonsContainer>
					<CustomButton type='submit'>Sign UP</CustomButton>
				</ButtonsContainer>
			</form>
		</SignUpContainer>
	);
};

export default SignUp;


