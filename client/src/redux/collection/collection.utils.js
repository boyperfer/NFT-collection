export const getCollectionNameByContract = (collections, contract) => {
	let result = '';
	for (const collection of collections) {
		if (collection.contract_address == contract) {
			console.log(12);
			result = collection.collection_name;
		}
	}

	return result;
};

export const getContractByID = (collections, id) => {
	let result = '';
	for (const collection of collections) {
		if (collection.collection_id == id) {
			result = collection.contract_address;
		}
	}

	return result;
};

export const getCollectionIDByName = (collections, name) => {
	let result = '';
	for (const collection of collections) {
		if (collection.collection_name == name) {
			result = collection.collection_id;
		}
	}

	return result;
};

export const getNameByCollectionID = (collections, id) => {
	let result = '';
	for (const collection of collections) {
		if (collection.collection_id == id) {
			result = collection.collection_name;
		}
	}

	return result;
};

