import {useSelector} from 'react-redux';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import {ProfileContainer, ProfileHeader, ProfileContent, UserDetail, TextContainer} from './user-profile.styles';

const User = () => {
	const currentUser = useSelector(selectCurrentUser);
	const {first_name, last_name, email_address, street_address,
		city, state, zip_code, ethereum_address, phone_number, balance, ethereum_balance} = currentUser
	console.log(currentUser)
	return (
	<ProfileContainer>
		<ProfileHeader>
			<h1>User Profile</h1>
		</ProfileHeader>
		<ProfileContent>
			<UserDetail>
				<TextContainer><strong>Name:</strong> {first_name} {last_name}</TextContainer>
				<TextContainer><strong>Email:</strong> {email_address} </TextContainer>
				<TextContainer><strong>Phone number:</strong> {phone_number} </TextContainer>
				<TextContainer><strong>Address:</strong> {street_address}, {city}, {state}, {zip_code}  </TextContainer>
				<TextContainer><strong>Ethereum address:</strong> {ethereum_address}  </TextContainer>
				<TextContainer><strong>Balance :</strong> {balance}  </TextContainer>
				<TextContainer><strong>Ethereum:</strong> {ethereum_balance}  </TextContainer>
			</UserDetail>
		</ProfileContent>
	</ProfileContainer>
)};

export default User
