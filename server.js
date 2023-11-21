const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'password',
	database: 'nft',
});

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get('/api/getNFTs', (request, res) => {
	db.query('SELECT * FROM NFT', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.get('/api/getCollections', (request, res) => {
	db.query('SELECT * FROM Collections', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.get('/api/getTraders', (request, res) => {
	db.query('SELECT * FROM Traders', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.get('/api/getTransactions', (request, res) => {
	db.query('SELECT * FROM PaymentTransactions ORDER BY transaction_id DESC', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.post('/signin', (request, res) => {
	const {username, password} = request.body;

	// Perform authentication logic, query your database
	// For simplicity, the password is stored as plaintext in this example
	console.log(username, password);
	const select = 'SELECT u.trader_id, a.balance, a.ethereum_balance';
	const from = 'FROM Users u JOIN AccountBalances a ON u.trader_id = a.trader_id';
	const where = `WHERE u.username = ? AND password = ? `;
	const query = `${select} ${from} ${where}`;

	db.query(query, [username, password], (error, result) => {
		if (error) {
			console.error('Error executing query:', error);
			res.status(500).send('Internal Server Error');
		} else if (result.length > 0) {
			// User found, send a success response

			res.json({success: true, message: 'Login successful', result});
		} else {
			// User not found, send a failure response
			res.json({success: false, message: 'Invalid credentials', result: null});
		}
	});
});

app.post('/deposit/:traderId', (request, res) => {
	const traderId = request.params.traderId;
	const {amount, paymentAddress, date, paymentType} = request.body;
	console.log(amount, paymentAddress)

	const sql1 = `INSERT INTO PaymentTransactions (amount_paid, payment_date, payment_type, trader_id, payment_address)`
	const sql2 = `VALUES (?, ?, ?, ?, ?)`
	const query = `${sql1} ${sql2}`

	db.query(query, [amount, date, paymentType, traderId, paymentAddress], (error, result) => {
		if (error) {
			console.error('Error transaction: ', error);
			res.status(500).send('Error transaction');
		} else {
			console.log('transaction processed successfully');
			res.json({success: true});
		}
	});

	const balanceType = paymentType == "Bank Transfer" ? `balance` : `ethereum_balance`
	const sql = `UPDATE AccountBalances SET ${balanceType} = ${balanceType} + ? WHERE trader_id = ?`;

	db.query(sql, [amount, traderId], (error, result) => {
		if (error) {
			console.error('Error increasing amount:', error);
			res.status(500).send('Error increasing amount');
		} else {
			console.log('Amount increased successfully');
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
