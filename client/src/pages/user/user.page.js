import { useState, useEffect } from "react"
import {useSelector} from "react-redux"
import CardList from "../../components/card-list/card-list.component"
import Header from "../../components/header/header.component"
import User from "../../components/user/user-profile.component"
import {selectNFTs} from "../../redux/nft/nft.selectors"
import {selectCurrentUser, selectIsSignIn} from "../../redux/user/user.selectors"
import { TextContainer } from "./user-page.styles"

const UserPage = () => {
	const isSignin = useSelector(selectIsSignIn)
	const currentUser = useSelector(selectCurrentUser)
	const nfts = useSelector(selectNFTs)

	const newFilteredNFTs = nfts.filter(nft => nft.ownership_id === currentUser.trader_id);


	return (
		isSignin ? (
			<div>
				<Header/>
				<User/>
				<h1> NFTs owned </h1>
				<CardList nfts={newFilteredNFTs}/>
			</div>
		) : (
			<div>
				<Header/>
				<TextContainer> please sign in </TextContainer>
			</div>
		)
		
	)
}

export default UserPage
