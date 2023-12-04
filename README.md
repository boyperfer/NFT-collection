### NFT Collection

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### REQUIREMENTS

`Node JS`

`Github CLI`

`MySQL`

`npm`

### Run the app

To clone the project run `gh repo clone boyperfer/NFT-collection`

move to the project `cd NFT-collection`

Create a database named `nft` and use it `use nft`

execute the sql file in mysql `source ./NFT.sql` to initialize the database

run `npm install`

run `node db.js` to fetch NFTs and collections from OpenSea API and store it into the database 

run `node server.js` to connect to the database

finally move to client `cd client` (run `npm install` as needed) and run `npm start` to run the app 

In db.js and server.js, remember to change the field `host` `user` `password` `database` based on your database	to establish a connection

For testing, there are currently two smart contract addresses in the dataase

`0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d`
`0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb`


