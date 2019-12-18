let sqlite3 = require('sqlite3')
let db = new sqlite3.Database('./ecommerce.db')

let createCustomersTable = `CREATE TABLE IF NOT EXISTS 
    customers(
        customer_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        first_name TEXT, 
        last_name TEXT, 
        email TEXT NOT NULL UNIQUE, 
        address TEXT, 
        city TEXT, 
        state TEXT, 
        zip INTEGER, 
        phone INTEGER
    )`
let createCategoriesTable = `CREATE TABLE IF NOT EXISTS 
    categories (
        category_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT
    )`
let createProductsTable = `CREATE TABLE IF NOT EXISTS 
    products (
        product_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT,
        image TEXT,
        quantity INTEGER, 
        category_id INTEGER NOT NULL, 
        price REAL,
        FOREIGN KEY (category_id) REFERENCES categories (category_id)
    )`
let createProductsImagesTable = `CREATE TABLE IF NOT EXISTS 
    product_images (
        product_image_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER NOT NULL,
        image TEXT,
        FOREIGN KEY (product_id) REFERENCES prodcuts (product_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )
`
let createOrdersTable = `CREATE TABLE IF NOT EXISTS 
    orders (
        order_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
        customer_id INTEGER NOT NULL,
        status TEXT,
        order_date TEXT,
        shipped_date TEXT,
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`
let createOrdersItemsTable = `CREATE TABLE IF NOT EXISTS 
    order_items (
        product_id INTEGER NOT NULL, 
        order_id INTEGER NOT NULL,
        quantity INTEGER,
        list_price REAL, 
        discount REAL
            CHECK (0 <= discount <= 1),
        PRIMARY KEY (product_id, order_id)
        FOREIGN KEY (product_id) REFERENCES products (product_id)
            ON DELETE CASCADE ON UPDATE NO ACTION,
        FOREIGN KEY (order_id) REFERENCES orders (order_id)
            ON DELETE CASCADE ON UPDATE NO ACTION
    )`
    
;[createCustomersTable, createProductsImagesTable, createCategoriesTable, createProductsTable, createOrdersTable, createOrdersItemsTable].forEach(table => {
    db.run(table, err => {
        if(err)
            console.log(`Create table failed`, err)
        else 
            console.log('Create table success')
    })
})

module.exports = db
