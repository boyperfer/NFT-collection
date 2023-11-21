import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {signOut} from '../../redux/user/user.actions';

import {selectIsSignIn} from '../../redux/user/user.selectors';

import {
	HeaderContainer,
	OptionsContainer,
	OptionLink,
} from './header.styles';

const Header = ({currentUser, hidden, signOutStart}) => {
	const dispatch = useDispatch();
	const isSignin = useSelector(selectIsSignIn);
	return (
		<HeaderContainer>
			<OptionsContainer>
				<OptionLink to='/'>HOME</OptionLink>
				<OptionLink to='/deposit'>DEPOSIT</OptionLink>
				<OptionLink to='/profile'>PROFILE</OptionLink>
				{ isSignin ? (
					<OptionLink as='div' onClick={() => dispatch(signOut())}>
                        SIGN OUT
					</OptionLink>
				) : (
					<OptionLink to='/signin'>SIGN IN</OptionLink>
				)}
			</OptionsContainer>
		</HeaderContainer>
	);
};

export default Header;
