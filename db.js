const mysql = require('mysql');
const sdk = require('api')('@opensea/v2.0#1nqh2zlnvr1o4h');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'nft',
});

const insertNFTs = (collection_name, limit, next, collection_id) => {
	sdk.auth('72d6be3878ab443b921b6b9f8906225a');
	sdk.server('https://api.opensea.io');
	sdk.list_nfts_by_collection({limit: limit, collection_slug: collection_name, next: next})
	  .then(({data: {nfts}}) => {
			const query = `INSERT INTO Collections(collection_id, collection_name, contract_address) VALUES (${collection_id}, '${collection_name}', '${nfts[0].contract}')`
			db.query(query, (error, result) => { if (error) { throw error; }})
			nfts.map(({identifier, image_url}, i) => {
				const sql = `INSERT INTO NFT (token_id, collection_id, ownership_id, url_image) VALUES (${identifier}, '${collection_id}', ${i + 1}, '${image_url}');`;
			db.query(sql, (error, result) => { if (error) { throw error; }})
			})
			console.log(collection_name + "NFTs added successfully")
	  })
		.catch(error_ => console.error(error_));

}

db.connect(error => {
	if (error) {
		throw error;
	}

	insertNFTs('boredapeyachtclub', '10', 'LXBrPTIzMTQzNzQ3', 1);
	insertNFTs('cryptopunks', '10', 'LXBrPTUzMTA5MQ==', 2);
});

module.exports = db;
