import React, {useEffect} from 'react';
import { useDispatch } from 'react-redux';

import { fetchUserStart } from '../../redux/user/user.actions';

import { SignInContainer } from './sign-in-page.styles'
import SignIn from '../../components/signin/signin.component'
import Header from '../../components/header/header.component';

const SignInPage = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(fetchUserStart());
	}, [dispatch]);

	return (
		<SignInContainer>
			<Header/>
			<SignIn/>
		</SignInContainer>
	)	

}


export default SignInPage;
