import React from 'react';

import { SignInContainer } from './sign-in-page.styles'
import SignIn from '../../components/signin/signin.component'
import Header from '../../components/header/header.component';

const SignInPage = () => (
    <SignInContainer>
		<Header/>
        <SignIn/>
    </SignInContainer>
)

export default SignInPage;
