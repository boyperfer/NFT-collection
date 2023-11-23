import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/header/header.component';
import SearchBox from '../../components/search-box/search-box.component';
import {selectNFTs} from '../../redux/nft/nft.selectors';
import {fetchNFTTransactionStart} from '../../redux/transaction/transaction.actions';
import {selectNFTTransactions} from '../../redux/transaction/transaction.selectors';
import {selectCurrentUser, selectUsers} from '../../redux/user/user.selectors';
import {shortenAddress, getCentralTime} from '../../utils.js';
import {
	TransactionContainer,
	HeaderContainer,
	TransferContainer,
	TextContainer,
	SearchBoxContainer,
} from './transaction-page.styles';

const TransactionPage = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchNFTTransactionStart());
	}, [dispatch]);

	const transactions = useSelector(selectNFTTransactions);
	const nfts = useSelector(selectNFTs);
	const currentUser = useSelector(selectCurrentUser);
	const users = useSelector(selectUsers);

	const [searchField, setSearchField] = useState('');
	const [filteredTransactions, setFilterTransactions] = useState(transactions);

	useEffect(() => {
		const newFilteredTransactions = transactions.filter(({buyer, seller}) => 
			(users[buyer].ethereum_address.toLocaleLowerCase().includes(searchField)) ||
			users[seller].ethereum_address.toLocaleLowerCase().includes(searchField));

		setFilterTransactions(newFilteredTransactions);
	  }, [transactions, searchField]);

	  const onSearchChange = event => {
		const searchFieldString = event.target.value.toLocaleLowerCase();
		setSearchField(searchFieldString);
	  };

	return (
		<TransactionContainer>
			<Header/>
			<HeaderContainer>Transaction History</HeaderContainer>
			<SearchBoxContainer onChangeHandler={onSearchChange} placeholder={"Enter your address"}/>
			<TransferContainer>
				<TextContainer bold>Contract address </TextContainer>
				<TextContainer bold>Token ID</TextContainer>
				<TextContainer bold>Date</TextContainer>
				<TextContainer bold>From</TextContainer>
				<TextContainer bold>To</TextContainer>
				<TextContainer bold>Value</TextContainer>
				<TextContainer bold>Fee</TextContainer>
				<TextContainer bold>Commission Type</TextContainer>
			</TransferContainer>
			{
				filteredTransactions.map(({commission_fee, transaction_amount, contract_address,
					buyer, seller, transaction_timestamp, nft_id, commission_type}, i) => (
					<TransferContainer>
						<TextContainer>{shortenAddress(contract_address)}</TextContainer>
						<TextContainer>{nfts[nft_id - 1].token_id}</TextContainer>
						<TextContainer>{getCentralTime(transaction_timestamp).slice(0, 10)}</TextContainer>
						<TextContainer>{shortenAddress(users[seller].ethereum_address)}</TextContainer>
						<TextContainer>{shortenAddress(users[buyer].ethereum_address)}</TextContainer>
						<TextContainer>{transaction_amount} ETH</TextContainer>
						<TextContainer>{commission_fee}</TextContainer>
						<TextContainer>{commission_type}</TextContainer>
					</TransferContainer>
				))
			}
		</TransactionContainer>
	);
};

export default TransactionPage;
