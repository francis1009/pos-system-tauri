
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    barcode TEXT UNIQUE,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    total_amount INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS transaction_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_id INTEGER NOT NULL,
    product_id INTEGER, -- Null for "Open Items"
    item_name TEXT NOT NULL,
    item_price_at_sale INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

CREATE TRIGGER IF NOT EXISTS update_product_updated_at
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    UPDATE products SET updated_at = CURRENT_TIMESTAMP WHERE id = OLD.id;
END;

INSERT INTO products (id, barcode, name, price)
VALUES
    (1, '1234567890', 'Item 1', 1000),
    (2, '1234567891', 'Item 2', 200),
    (3, '1234567892', 'Item 3', 300),
    (4, '1234567893', 'Item 4', 400),
    (5, '1234567894', 'Item 5', 500);