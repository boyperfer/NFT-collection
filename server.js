const express = require('express');
const cors = require('cors')
const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'nft',
});


const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/getNFTs", (req,res)=>{
	db.query("SELECT * FROM NFT", (err,result)=>{
		if(err) {
			console.log(err)
		}
		res.send(result)});
});

app.get("/api/getCollections", (req,res)=>{
	db.query("SELECT * FROM Collections", (err,result)=>{
		if(err) {
			console.log(err)
		}
		res.send(result)});
});

app.get("/api/getTraders", (req,res)=>{
	db.query("SELECT * FROM Traders", (err,result)=>{
		if(err) {
			console.log(err)
		}
		res.send(result)});
});


app.post('/signin', (req, res) => {
	const { username, password } = req.body;

	// Perform authentication logic, query your database
	// For simplicity, the password is stored as plaintext in this example
	console.log(username, password)
	const query = `SELECT trader_id FROM Users WHERE username = '${username}' AND password = '${password}'`;

	db.query(query, (err, result) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).send('Internal Server Error');
		} else {
			if (result.length > 0) {
				// User found, send a success response
				
				res.json({ success: true, message: 'Login successful', result: result });
			} else {
				// User not found, send a failure response
				res.json({ success: false, message: 'Invalid credentials', result: null });
			}
		}
	});
});

app.listen(PORT, ()=>{
	console.log(`Server is running on ${PORT}`)
})

