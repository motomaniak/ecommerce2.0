let sqlite3 = require('sqlite3')
let db = new sqlite3.Database('./ecommerce.db')

let createCustomersTable = `CREATE TABLE IF NOT EXISTS 
    customers(
        first_name text, 
        last_name text, 
        email text NOT NULL UNIQUE, 
        address text, 
        city text, 
        state text, 
        zip integer, 
        phone integer
    )`
let createCategoriesTable = `CREATE TABLE IF NOT EXISTS 
    categories (
        name text
    )`
let createProductsTable = `CREATE TABLE IF NOT EXISTS 
    products (
        name text, 
        quantity integer, 
        category_id integer NOT NULL, 
        price real
    )`
let createOrdersTable = `CREATE TABLE IF NOT EXISTS 
    orders (
        customer_id integer,
        status text,
        order_date text,
        shipped_date text
    )`
let createOrdersItemsTable = `CREATE TABLE IF NOT EXISTS 
    order_items (
        product_id integer NOT NULL, 
        order_id integer NOT NULL,
        quantity integer,
        list_price real, 
        discount real
            CHECK (0 <= discount <= 1)
    )`
    
;[createCustomersTable, createCategoriesTable, createProductsTable, createOrdersTable, createOrdersItemsTable].forEach(table => {
    db.run(table, err => {
        if(err)
            console.log(`Create table failed`, err)
        else 
            console.log('Create table success')
    })
})

module.exports = db