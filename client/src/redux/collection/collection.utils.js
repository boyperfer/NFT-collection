export const getCollectionNameByContract = (collections, contract) => {
	let result = '';
	collections.forEach(collection => {
		if (collection.contract_address == contract) {
			console.log(12);
			result = collection.collection_name;
		}
	});	
	return result;
}

export const getCollectionIDByName = (collections, name) => {
	let result = '';
	collections.forEach(collection => {
		if (collection.collection_name == name) {
			result = collection.collection_id;
		}
	});	
	return result;
}
