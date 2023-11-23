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
	db.query('SELECT * FROM Traders t JOIN CommissionRates c on t.trader_level = c.trader_level', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.get('/api/getPaymentTransactions', (request, res) => {
	db.query('SELECT * FROM PaymentTransactions ORDER BY transaction_id DESC', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.get('/api/getNFTTransactions', (request, res) => {
	db.query('SELECT * FROM NFTTransactions ORDER BY transaction_id DESC', (error, result) => {
		if (error) {
			console.log(error);
		}

		res.send(result);
	});
});

app.post('/weeklyVolume', (request, res) => {
	const {searchFieldWeekly}= request.body

	const query = `SELECT WEEK(?) AS week, SUM(transaction_amount) AS WeeklyVolume`
	const from = `FROM NFTTransactions n`
	const where = `WHERE WEEK(n.transaction_timestamp) = WEEK(?)`
	const groupBy = `GROUP BY week;`
	const sql = `${query} ${from} ${where} ${groupBy}`

	db.query(sql,[searchFieldWeekly, searchFieldWeekly], (error, results) => {
		if (error) {
			throw error;
		}
		if (results.length === 0){
			res.json({success: false})
		} else {
			res.json({success: true, results});
		}
	});
});

app.post('/dailyVolume', (request, res) => {
	const {searchFieldDaily}= request.body

	const query = `SELECT DATE(?) as date, SUM(transaction_amount) as DailyVolume`;
	const from = `FROM NFTTransactions n`
	const where = `WHERE DATE(n.transaction_timestamp) = DATE(?)`
	const groupBy = `GROUP BY date`
	const sql = `${query} ${from} ${where} ${groupBy}`

	db.query(sql,[searchFieldDaily, searchFieldDaily], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results)
		if (results.length === 0){
			res.json({success: false})
		} else {
			res.json({success: true, results});
		}
	});
});

app.post('/monthlyVolume', (request, res) => {
	const {searchFieldMonthly}= request.body

	const query = `SELECT MONTH(?) as month, SUM(transaction_amount) as MonthlyVolume`;
	const from = `FROM NFTTransactions n`
	const where = `WHERE MONTH(n.transaction_timestamp) = MONTH(?)`
	const groupBy = `GROUP BY month`
	const sql = `${query} ${from} ${where} ${groupBy}`

	db.query(sql,[searchFieldMonthly, searchFieldMonthly], (error, results) => {
		if (error) {
			throw error;
		}
		console.log(results)
		if (results.length === 0){
			res.json({success: false})
		} else {
			res.json({success: true, results});
		}
	});
});

app.post('/signin', (request, res) => {
	const {username, password} = request.body;

	const select = 'SELECT u.trader_id, a.balance, a.ethereum_balance';
	const from = 'FROM Users u JOIN AccountBalances a ON u.trader_id = a.trader_id';
	const where = 'WHERE u.username = ? AND password = ? ';
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

app.post('/password/:traderId', (request, res) => {
	console.log(request);
	const {password} = request.body;

	const select = 'SELECT u.trader_id ';
	const from = 'FROM Users u';
	const where = 'WHERE password = ? ';
	const query = `${select} ${from} ${where}`;

	db.query(query, [password], (error, result) => {
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
	const {amount, paymentAddress, paymentType} = request.body;
	console.log(amount, paymentAddress);

	const sql1 = 'INSERT INTO PaymentTransactions (amount_paid, payment_date, payment_type, trader_id, payment_address)';
	const sql2 = 'VALUES (?, CURRENT_TIMESTAMP, ?, ?, ?)';
	const query = `${sql1} ${sql2}`;

	db.query(query, [amount, paymentType, traderId, paymentAddress], (error, result) => {
		if (error) {
			console.error('Error transaction:', error);
			res.status(500).send('Error transaction');
		} else {
			console.log('transaction processed successfully');
			res.json({success: true});
		}
	});

	const balanceType = paymentType == 'Bank Transfer' ? 'balance' : 'ethereum_balance';
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

app.post('/transaction/:traderId', (request, res) => {
	const traderId = request.params.traderId;
	const {commissionFee, commissionType, contract_address, nft_id, price, seller_id} = request.body;

	const sql1 = 'INSERT INTO NFTTransactions (commission_fee, commission_type, contract_address, nft_id, transaction_amount, seller, buyer)';
	const sql2 = 'VALUES (?, ?, ?, ?, ?, ?, ?)';
	const query = `${sql1} ${sql2}`;

	db.query(query, [commissionFee, commissionType, contract_address, nft_id, price, seller_id, traderId], (error, result) => {
		if (error) {
			console.error('Error transaction:', error);
			res.status(500).send('Error transaction');
		} else {
			console.log('transaction processed successfully');
			res.json({success: true});
		}
	});

	const sql = 'UPDATE NFT SET ownership_id = ? WHERE nft_id = ?';

	db.query(sql, [traderId, nft_id], (error, result) => {
		if (error) {
			console.error('Error setting owner:', error);
			res.status(500).send('Error setting owner');
		} else {}
	});

	const sql3 = 'UPDATE AccountBalances SET ethereum_balance = ethereum_balance - ? WHERE trader_id = ?';

	db.query(sql3, [price, traderId], (error, result) => {
		if (error) {
			console.error('Error setting ethereum_balance:', error);
			res.status(500).send('Error setting ethereum_balance');
		} else {}
	});

	if (commissionType == 'USD') {
		const sql4 = 'UPDATE AccountBalances SET balance = balance - ? WHERE trader_id = ?';

		db.query(sql4, [commissionFee, traderId], (error, result) => {
			if (error) {
				console.error('Error setting balance:', error);
				res.status(500).send('Error setting balance');
			} else {}
		});
	} else {
		const sql4 = 'UPDATE AccountBalances SET ethereum_balance = ethereum_balance - ? WHERE trader_id = ?';

		db.query(sql4, [commissionFee, traderId], (error, result) => {
			if (error) {
				console.error('Error setting balance:', error);
				res.status(500).send('Error setting balance');
			} else {}
		});
	}

	const sql5 = 'UPDATE AccountBalances SET ethereum_balance = ethereum_balance + ? WHERE trader_id = ?';

	db.query(sql5, [price, seller_id], (error, result) => {
		if (error) {
			console.error('Error setting ethereum_balance:', error);
			res.status(500).send('Error setting ethereum_balance');
		} else {}
	});

	const sql6 = 'UPDATE Traders SET volume = volume + ? WHERE trader_id = ?';

	db.query(sql6, [price, traderId], (error, result) => {
		if (error) {
			console.error('Error setting ethereum_balance:', error);
			res.status(500).send('Error setting ethereum_balance');
		} else {}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
