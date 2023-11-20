CREATE TABLE CommissionRates(
    trader_level VARCHAR(10) PRIMARY KEY,
    commission_rate DECIMAL(5, 4)
);

CREATE TABLE Traders (
    trader_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) NOT NULL,
    cell_phone_number VARCHAR(15),
    email_address VARCHAR(100) NOT NULL,
    street_address VARCHAR(255),
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    ethereum_address VARCHAR(42) UNIQUE NOT NULL, 
	trader_level VARCHAR(10) DEFAULT 'SILVER',
	FOREIGN KEY (trader_level) REFERENCES CommissionRates(trader_level)
);

CREATE TABLE Collections (
	collection_id BIGINT PRIMARY KEY,
	collection_name VARCHAR(255) NOT NULL UNIQUE,
	contract_address VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE NFT (
	nft_id BIGINT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    token_id BIGINT,
    collection_id BIGINT,
	ownership_id BIGINT,
	url_image VARCHAR(255),
	FOREIGN KEY (ownership_id) REFERENCES Traders(trader_id),
	FOREIGN KEY (collection_id) REFERENCES Collections(collection_id),
	UNIQUE (collection_id, token_id)
);

-- Table for storing user information
CREATE TABLE Users (
	trader_id BIGINT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
	FOREIGN KEY (trader_id) REFERENCES Traders(trader_id)
);

-- Table for storing account balances
CREATE TABLE AccountBalances (
    trader_id BIGINT PRIMARY KEY,
    balance DECIMAL(18, 2) DEFAULT 0.00,
    ethereum_balance DOUBLE PRECISION DEFAULT 0.00,
    FOREIGN KEY (trader_id) REFERENCES Traders(trader_id)
);

-- Table for storing NFT transactions
CREATE TABLE NFTTransactions (
    transaction_id BIGINT PRIMARY KEY,
	commission_fee DECIMAL(18,2),
	comission_type VARCHAR(10),
    contract_address VARCHAR(255) NOT NULL,
    nft_id BIGINT NOT NULL,
    transaction_amount DECIMAL(18, 2) NOT NULL,
    transaction_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	total_price DOUBLE PRECISION,
	seller BIGINT,
	buyer BIGINT,
    FOREIGN KEY (nft_id) REFERENCES NFT(nft_id),
	FOREIGN KEY (seller) REFERENCES Traders(trader_id),
	FOREIGN KEY (buyer) REFERENCES Traders(trader_id)
);

CREATE TABLE PaymentTransactions (
    transaction_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    amount_paid DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_type VARCHAR(50) NOT NULL,
    trader_id BIGINT NOT NULL,
    payment_address VARCHAR(255) NOT NULL,
	FOREIGN KEY (trader_id) REFERENCES Traders(trader_id)
);

CREATE TABLE CancellationLogs (
    log_id BIGINT PRIMARY KEY AUTO_INCREMENT,
    transaction_id BIGINT NOT NULL,
    cancellation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(255),
    FOREIGN KEY (transaction_id) REFERENCES PaymentTransactions(transaction_id)
);

-- Stored procedure to retrieve aggregate transaction information
DELIMITER //
CREATE PROCEDURE GetTransactionTotals(
    IN start_date DATE,
    IN end_date DATE
)
BEGIN
    -- Daily total transactions
    SELECT
        DATE(payment_date) AS transaction_date,
        COUNT(*) AS daily_transaction_count,
        SUM(amount_paid) AS daily_transaction_amount
    FROM PaymentTransactions
    WHERE payment_date BETWEEN start_date AND end_date
    GROUP BY DATE(payment_date);

    -- Weekly total transactions
    SELECT
        YEARWEEK(payment_date) AS week_number,
        COUNT(*) AS weekly_transaction_count,
        SUM(amount_paid) AS weekly_transaction_amount
    FROM PaymentTransactions
    WHERE payment_date BETWEEN start_date AND end_date
    GROUP BY YEARWEEK(payment_date);

    -- Monthly total transactions
    SELECT
        DATE_FORMAT(payment_date, '%Y-%m') AS month,
        COUNT(*) AS monthly_transaction_count,
        SUM(amount_paid) AS monthly_transaction_amount
    FROM PaymentTransactions
    WHERE payment_date BETWEEN start_date AND end_date
    GROUP BY DATE_FORMAT(payment_date, '%Y-%m');
END //
DELIMITER ;

INSERT INTO CommissionRates (trader_level, commission_rate) VALUES
('SILVER', 0.02),
('GOLD', 0.03);

INSERT INTO Traders (trader_id, first_name, last_name, phone_number, cell_phone_number, email_address, street_address, city, state, zip_code, ethereum_address, trader_level) VALUES
(1, 'John', 'Doe', '123-456-7890', '987-654-3210', 'john.doe@email.com', '123 Main St', 'Cityville', 'CA', '12345', '0x1234567890123456789012345678901234567890', 'SILVER'),
(2, 'Jane', 'Smith', '234-567-8901', '876-543-2109', 'jane.smith@email.com', '456 Oak St', 'Townsville', 'NY', '67890', '0x9876543210987654321098765432109876543210', 'GOLD'),
(3, 'Bob', 'Johnson', '345-678-9012', '765-432-1098', 'bob.johnson@email.com', '789 Pine St', 'Villageton', 'TX', '45678', '0xabcdef0123456789abcdef0123456789abcdef01', 'GOLD'),
(4, 'Alice', 'Williams', '456-789-0123', '654-321-0987', 'alice.williams@email.com', '890 Cedar St', 'Hamletville', 'FL', '56789', '0x3456789012345678901234567890123456789034', 'SILVER'),
(5, 'Charlie', 'Brown', '567-890-1234', '543-210-9876', 'charlie.brown@email.com', '901 Elm St', 'Villagetown', 'AZ', '67890', '0x0123456789012345678901234567890123456789', 'GOLD'),
(6, 'Eva', 'Davis', '678-901-2345', '432-109-8765', 'eva.davis@email.com', '123 Birch St', 'Citytown', 'WA', '78901', '0x6789012345678901234567890123456789012345', 'SILVER'),
(7, 'Frank', 'Miller', '789-012-3456', '321-098-7654', 'frank.miller@email.com', '234 Maple St', 'Villageville', 'OR', '89012', '0x3456789012345678901234567890123456789078', 'SILVER'),
(8, 'Grace', 'Wilson', '890-123-4567', '210-987-6543', 'grace.wilson@email.com', '345 Pine St', 'Townville', 'CA', '90123', '0x0123456789012345678901234567890123456701', 'GOLD'),
(9, 'Henry', 'Anderson', '901-234-5678', '109-876-5432', 'henry.anderson@email.com', '456 Oak St', 'Hamletville', 'NY', '01234', '0xabcdef0123456789abcdef0123456789abcdef02', 'SILVER'),
(10, 'Ivy', 'Moore', '012-345-6789', '987-654-3210', 'ivy.moore@email.com', '567 Cedar St', 'Villageton', 'TX', '12345', '0x3456789012345678901234567890123456789012', 'GOLD');



INSERT INTO Users (trader_id, username, password) VALUES
(1, 'john_doe', 'password123'),
(2, 'jane_smith', 'securepass456'),
(3, 'bob_johnson', 'strong_password'),
(4, 'alice_williams', 'qwerty'),
(5, 'charlie_brown', 'letmein'),
(6, 'eva_davis', 'myp@ssw0rd'),
(7, 'frank_miller', 'pass1234'),
(8, 'grace_wilson', 'abc123'),
(9, 'henry_anderson', 'password456'),
(10, 'ivy_moore', 'securepass789');

-- Insert data into AccountBalances table
INSERT INTO AccountBalances (trader_id, balance, ethereum_balance) VALUES
(1, 10000.50, 25.75),
(2, 7500.25, 50.30),
(3, 50000.75, 100.00),
-- Add more tuples as needed
(4, 12000.00, 75.50),
(5, 3000.80, 30.25),
(6, 15000.60, 60.75),
(7, 2500.45, 20.10),
(8, 18000.30, 90.20),
(9, 9000.90, 45.60),
(10, 6000.40, 15.30);

