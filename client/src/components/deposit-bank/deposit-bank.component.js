import {useState, } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router';

import {selectCurrentUser} from '../../redux/user/user.selectors';

import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-buttons/custom-button.component';

import {TitleContainer, ButtonsContainer, DepositContainer} from './deposit-bank.styles';
import {setBalance, setEthereum} from '../../redux/user/user.actions';

const DepositBank = ({paymentType}) => {
	const dispatch = useDispatch()
	const currentUser = useSelector(selectCurrentUser);
	const navigate = useNavigate()
	const {trader_id} = currentUser;

	let date = new Date();
	date = date.toISOString().split('T')[0];
	const [payment, setPayment] = useState({
		amount: '',
		paymentAddress: '',
	});

	const {amount, paymentAddress} = payment;

	const handleChange = event => {
		const {name, value} = event.target;
		setPayment({...payment, [name]: value});
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log(event, 1);
		fetch(`http://localhost:3002/deposit/${trader_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({paymentAddress, amount, date, paymentType}),
		})
			.then(response => response.json())
			.then(data => {
				if(data.success) {
					paymentType == "Bank Transfer" ? 
						dispatch(setBalance(currentUser.balance + parseInt(amount))) : 
						dispatch(setEthereum(currentUser.ethereum_balance + parseInt(amount)));
					navigate('/');

				} else {
					alert('The transaction was failed');
				}
				
			})
			.catch(error => {
				console.error('Error:', error);
			});
	};
	return (
		<DepositContainer>
			<TitleContainer>
				Deposit via {paymentType} 
			</TitleContainer>
			<form onSubmit={handleSubmit}>
				<FormInput
					handleChange={handleChange}
					label='Payment Address'
					name='paymentAddress'
					type='text'
					value={paymentAddress}
					required
				/>
				<FormInput
					handleChange={handleChange}
					label='Amount'
					name='amount'
					type='text'
					value={amount}
					required
				/>
				<ButtonsContainer >
					<CustomButton type='submit' >Submit</CustomButton>
				</ButtonsContainer>
			</form>
		</DepositContainer>
	);
};

export default DepositBank;
