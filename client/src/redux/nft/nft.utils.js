export const filteredNFTsUtil = (nfts, nftID) => {
	console.log("test"+ nfts);
	const result = nfts.filter(nft => nft.collection_id == nftID);
	return result;
} 

