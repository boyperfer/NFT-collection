import React from 'react'
import {useSelector} from 'react-redux';
import {selectTransactions} from '../../redux/transaction/transaction.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';
import { shortenAddress, getCentralTime } from '../../utils';

import {
	TransactionContainer,
	HeaderContainer,
	TypeContainer,
	DateContainer,
	TableContainer,
	AmountContainer,
	TransferContainer,
	MoneyContainer
} from './transaction.styles';

const Transaction = () => {
	const transactions = useSelector(selectTransactions)	
	const currentUser = useSelector(selectCurrentUser)

	const filteredTransactions = transactions.filter(transaction => transaction.trader_id === currentUser.trader_id);

    return (
        <TransactionContainer>
			<HeaderContainer>Transfer History</HeaderContainer>
		{
			filteredTransactions.map(({payment_type, amount_paid, payment_date, payment_address}, i) => ( 
				<TransferContainer>
					<TableContainer>
						<TypeContainer>Deposit via {payment_type} {shortenAddress(payment_address)}</TypeContainer>
						<DateContainer>{getCentralTime(payment_date).slice(0,10)}</DateContainer>
					</TableContainer>
					<AmountContainer>
						<MoneyContainer>{payment_type == "Bank Transfer" ? `$${amount_paid} USD` : `${amount_paid} ETH`}</MoneyContainer>
					</AmountContainer>
				</TransferContainer>
			))
		}
        </TransactionContainer>
)}


export default Transaction;
