let express = require('express')
let db = require('./database')

const PORT = 9000

let app = express()

app.use(express.json())

app.get('/', function(req, res){
    res.send(`Visit /api/store to see a list of products available`)
})

//Get a list of all products in the store
app.get('/api/store', (req, res) => {
    console.log("here")
    let getAllProducts = "SELECT * FROM products"
    db.all(getAllProducts, (err, result) => {
        if(err){
            console.log(`Somehing happened getting the list of produts`, err)
            res.sendStatus(500)
        }
        res.staus(200).json(result)
    })
})

//Get customer information
app.get('/api/store/customer/:id', (req, res) => {
    let customerID = req.params.id
    let getCustomerInfo = `SELECT * FROM customers WHERE oid = ?`
    db.get(getCustomerInfo, [customerID], (err, result) => {
        if(err){
            console.log(`Couldn't get customer info`, err)
            res.sendStatus(500)
        }else{
            res.status(200).json(result)
        }
    })
})

//Update a customers information 
app.put('/api/store/customer/:id', (req,res) => {
    // get book id from url params (`req.params`)
    let customerID = parseInt(req.params.id)

    let queryHelper = Object.keys(req.body).map(ele => `${ele.toUpperCase()} = ?`)

    let queryValues = [...Object.values(req.body), customerID]

    let updateCustomer = `UPDATE customers SET ${queryHelper.join(', ')} WHERE oid = ?`

    
    db.run(updateCustomer, queryValues, err => {
        if(err){
            console.log(`Something went wrong updating customer with id ${customerID}`, err)
            res.sendStatus(500)
        }else{
            console.log(`Update to customer with id ${customerID} successful`)
            res.sendStatus(200)
        }
    })
});

//Add a new customer
app.post('/api/store/customer', (req, res) => {
    let customerID = parseInt(req.params.id)

    let queryHelper = Object.keys(req.body)
    let queryHelper2 = Object.keys(req.body).map(ele => `?`)
    
    let queryValues = [...Object.values(req.body)]

    let addNewCustomer = `INSERT INTO customers (${queryHelper.join(', ')}) VALUES (${queryHelper2.join(', ')})`
    
    db.run(addNewCustomer, queryValues, err => {
        if(err){
            console.log(`Something went wrong adding new customer`, err)
            res.sendStatus(500)
        }else{
            console.log(`Adding new customer successful`)
            res.sendStatus(200)
        }
    })
})

//Get customers orders 
app.get('/api/store/customer/:id/orders', (req, res) => {
    let customerID = parseInt(req.params.id)
    let getCustomerOders = `
    SELECT 
        orders.rowid, 
        orders.status, 
        orders.order_date, 
        orders.shipped_date,
        order_items.quantity,
        order_items.list_price,
        products.name
    FROM 
        orders 
    JOIN 
        customers on orders.customer_id = customers.oid 
    JOIN 
        order_items on orders.oid = order_items.order_id
    JOIN 
        products on products.oid = order_items.oid
    WHERE 
        customers.oid = ?`
    db.all(getCustomerOders, [customerID], (err, result) => {
        if(err){
            console.log(`Couldn't get orders for customer with id ${customerID}`, err)
            res.sendStatus(500)
        }else{
            res.status(200).json(result)
        }
    })
})

//Add new category
app.post('/api/store/categories', (req, res) => {
    let addNewCategory = `INSERT INTO categories VALUES (?)`
    let category = req.body.category
    db.run(addNewCategory, [category], err => {
        if(err){
            console.log(`Coulnd't enter category ${category} into the database`, err)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

//Add new products to the store
app.post('/api/store', (req, res) => {
    let addNewProduct = `INSERT INTO products VALUES (?,?,?,?)`
    let getCategoryID = `SELECT oid FROM categories WHERE name = ?`
    let category = req.body.category
    let name = req.body.name
    let quantity = parseInt(req.body.quantity)
    let price = parseFloat(req.body.price)

    db.get(getCategoryID, [category], (err, result) => {
        if(err){
            console.log(`Couldn't get category ID for ${category}`)
            res.sendStatus(500)
        }else{
            console.log(result.rowid + " " + price + " " + name)
            db.run(addNewProduct, [name, quantity, result.rowid, price], err => {
                if(err){
                    console.log(`Couldn't add ${name} to database`, err)
                    res.sendStatus(500)
                }else{
                    console.log(`Added ${name} to the database`)
                    res.sendStatus(200)
                }
            })
        }
    })
})

//Create order to add items to 'Shopping Cart/Pending order'
app.post('/api/store/customer/:id/order', (req, res) => {
    let customerID = parseInt(req.params.id)
    let createNewOrder = `INSERT INTO orders VALUES (?,?,?,?)`
    db.run(createNewOrder, [customerID, "Pending", Date(Date.now())], err => {
        if(err){
            console.log(`Something went wrong creating a new order`, err)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

//Add items to pending order for customer ID 
app.post('/api/store/order/:o_id/product/:p_id', (req, res) => {
    let orderID = parseInt(req.params.o_id)
    let prodcutID = parseInt(req.params.p_id)
    let quantity = parseInt(req.body.quantity)
    let discount = parseInt(req.body.discount)
    let getStatus = `SELECT status FROM orders WHERE oid = ?`
    let addProductToOrder = `INSERT INTO order_items values (?,?,?,?,?)`
    let getCurrentPrice = `SELECT price FROM products WHERE oid = ?`
    
    db.get(getStatus, [orderID], (err, result) => {
        if(err){
            console.log(`Coulnd't get status for order ${orderID}`, err)
            res.sendStatus(500)
        }else if(result.status != "Pending"){
            console.log(`Can't add to non pending order, please create new order`)
            res.sendStatus(500)
        }else{
            db.get(getCurrentPrice, [prodcutID], (err, result) => {
                if(err){
                    console.log(`Couldn't get current price`, err)
                    res.sendStatus(500)
                }else{
                    db.run(addProductToOrder, [orderID, prodcutID, quantity, result.price, discount], err => {
                        if(err){
                            console.log(`Couldn't add product to order`, err)
                            res.sendStatus(500)
                        }else{
                            res.sendStatus(200)
                        }
                    })
                }
            })
        }
    })
})

//Delete a product from an order 
app.delete('/api/store/order/:o_id/product/:p_id', (req, res) => {
    let orderID = parseInt(req.params.o_id)
    let prodcutID = parseInt(req.params.p_id)
    let getStatus = `SELECT status FROM orders WHERE oid = ?`
    let deleteItemOrder =`DELETE FROM order_items WHERE order_id = ? AND product_id = ?`
    db.get(getStatus, [orderID], (err, result) => {
        if(err){
            console.log(`Coulnd't get status for order ${orderID}`, err)
            res.sendStatus(500)
        }else if(result.status != "Pending"){
            console.log(`Can't remove from non pending order, please submit return request`)
            res.sendStatus(500)
        }else{
            db.run(deleteItemOrder, [orderID, prodcutID], err => {
                if(err){
                    console.log(`Couldn't remove product from order`, err)
                    res.sendStatus(500)
                }else{
                    res.sendStatus(200)
                }
            })
        }
    })
})

//Update quantity of product for an order
app.put('/api/store/order/:o_id/product/:p_id', (req, res) => {
    let orderID = parseInt(req.params.o_id)
    let prodcutID = parseInt(req.params.p_id)
    let quantity = parseInt(req.body.quantity)
    let updateProductQuantity = `UPDATE order_items SET quantity = ? WHERE order_id = ? AND product_id = ?`
    db.run(updateProductQuantity, [quantity, orderID, prodcutID], err => {
        if(err){
            console.log(`Couldn't update quantity`)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

//Update an order to shipped status 
app.put('/api/store/order/:id', (req, res) => {
    let orderID = req.params.id
    let status = req.body.status
    let date = null
    if(status == 'Shipped')
        date = Date(Date.now())
    
    let updateOrderShipped = `UPDATE orders SET status = ?, shipped_date = ? WHERE oid = ?`
    db.run(updateOrderShipped, [date, orderID], err => {
        if(err){
            console.log(`Couldn't update order ${orderID} to shipped`)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`)
})