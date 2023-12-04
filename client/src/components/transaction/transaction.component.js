import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router';

import {selectTransactions} from '../../redux/transaction/transaction.selectors';
import {setBalance} from '../../redux/user/user.actions';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { shortenAddress, getCentralTime } from '../../utils';
import CustomButton from '../custom-buttons/custom-button.component';

import {
	TransactionContainer,
	HeaderContainer,
	TypeContainer,
	DateContainer,
	TableContainer,
	AmountContainer,
	TransferContainer,
	MoneyContainer,
	StatusContainer
} from './transaction.styles';

const Transaction = () => {
	const dispatch = useDispatch();
	const transactions = useSelector(selectTransactions)	
	const navigate = useNavigate();
	const currentUser = useSelector(selectCurrentUser)
	const currentDate = new Date();
	const currentMinutes = currentDate.getMinutes();
	console.log(currentMinutes)

	const filteredTransactions = transactions.filter(transaction => (transaction.trader_id === currentUser.trader_id));
	const handleSubmit = (different, amount_paid, payment_date, transaction_id, payment_type, status) => {
		console.log(payment_type);
		if (status === "FINALIZED" || payment_type === "Ethereum Network" || status === "CANCELED") {
			alert("You can only cancel transactions within 15 minutes after depositing. Threfore, the transaction is finalized or canceled. You cannot cancel")
		} else {
		fetch(`http://localhost:3002/cancellation/${currentUser.trader_id}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({amount_paid, transaction_id, different}),
		})
			.then(response => response.json())
			.then(data => {
				if(data.success) {
					alert("The transaction is canceled successfully");
					dispatch(setBalance(currentUser.balance - parseInt(amount_paid)));  
					navigate('/');

				} else {
					alert('The cancellation was failed');
				}
				
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}
	};


    return (
        <TransactionContainer>
			<HeaderContainer>Transfer History</HeaderContainer>
		{
			filteredTransactions.map(({payment_type, amount_paid, payment_date, payment_address, transaction_id, status}, i) => { 
				const date = new Date(payment_date);
				const different = (currentDate.getTime() - date.getTime()) / (1000 * 60);   
				return (<TransferContainer>
					<TableContainer>
						<TypeContainer>Deposit via {payment_type} {shortenAddress(payment_address)}</TypeContainer>
						<DateContainer>{getCentralTime(payment_date).slice(0,10)}</DateContainer>
					</TableContainer>
					<AmountContainer>
						<MoneyContainer>{payment_type === "Bank Transfer" ? `$${amount_paid} USD` : `${amount_paid} ETH`}</MoneyContainer>
					</AmountContainer>
					<StatusContainer>
						{status}
					</StatusContainer>
					<CustomButton onClick={() =>{ 
						handleSubmit(different, amount_paid, payment_date, transaction_id, payment_type, status);
					}}>
						Cancel	
					</CustomButton>
				</TransferContainer>)
			})
		}
        </TransactionContainer>
)}


export default Transaction;
