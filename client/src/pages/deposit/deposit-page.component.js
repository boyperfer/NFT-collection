import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchTransactionStart } from "../../redux/transaction/transaction.actions";

import DepositBank from "../../components/deposit-bank/deposit-bank.component";
import Header from "../../components/header/header.component";
import Transaction from "../../components/transaction/transaction.component";

import { DepositContainer, DepositPageContainer } from "./deposit-page.styles";


const DepositPage = () =>{
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(fetchTransactionStart())
	}, [dispatch]);
	
	return (
		<DepositPageContainer>
			<DepositContainer>
				<Header/>
				<DepositBank paymentType={'Bank Transfer'}/>
				<DepositBank paymentType={'Ethereum Network'}/>
			</DepositContainer>
			<Transaction/>
		</DepositPageContainer>
	);
}

export default DepositPage;
