import React from 'react'
import {useSelector} from 'react-redux';
import {selectTransactions} from '../../redux/transaction/transaction.selectors';
import { shortenAddress } from '../../utils';

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
	console.log(transactions)

    return (
        <TransactionContainer>
			<HeaderContainer>Transfer History</HeaderContainer>
		{
			transactions.map(({payment_type, amount_paid, payment_date, payment_address}, i) => ( 
				<TransferContainer>
					<TableContainer>
						<TypeContainer>Deposit via {payment_type} {shortenAddress(payment_address)}</TypeContainer>
						<DateContainer>{payment_date.slice(0,10)}</DateContainer>
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
