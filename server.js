let express = require('express')
let db = require('./database')

const PORT = 9000

let app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
 
    next()  
})

app.use(express.json())

app.get('/', function(req, res){
    res.send(`Visit /api/store to see a list of products available`)
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
    let customerID = parseInt(req.params.id)

    let queryHelper = Object.keys(req.body).map(ele => `${ele.toUpperCase()} = ?`)

    let queryValues = [...Object.values(req.body), customerID]

    let updateCustomer = `UPDATE customers SET ${queryHelper.join(', ')} WHERE customer_id = ?`

    console.log(updateCustomer)
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

//Delete customer and all associated information so there isn't any orphan data
app.delete('/api/store/customer/:id', (req, res) => {
    let customerID = req.params.id
    let deleteCustomer = `DELETE FROM customers WHERE customer_id = ?`
    db.run(deleteCustomer, [customerID], err => {
        if(err){
            console.log(`Couldn't delete customer from database`, err)
            res.sendStatus(500)
        }else{
            console.log('Deleted customer successful')
            res.sendStatus(200)
        }
    })
})

//Add a new customer
app.post('/api/store/customer', (req, res) => {
    console.log(req.body)
    let queryHelper = Object.keys(req.body)
    let queryHelper2 = Object.keys(req.body).map(ele => `?`)
    
    let queryValues = [...Object.values(req.body)]

    let addNewCustomer = `INSERT INTO customers (${queryHelper.join(', ')}) VALUES (${queryHelper2.join(', ')})`
    console.log(addNewCustomer)
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
        orders.shipped_date
    FROM 
        orders 
    JOIN 
        customers on orders.customer_id = customers.oid 
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

//Delete Category
app.delete('/api/store/category/:id', (req, res) => {
    let categoryID = req.params.id
    let deleteCategory = `DELETE from categories WHERE oid = ?`
    db.run(deleteCategory, [categoryID], err => {
        if(err){
            console.log(`Couldn't delete category`, err)
            res.sendStatus(500)
        }else{
            console.log(`Deleted category successfully`)
            res.sendStatus(200)
        }
    })
})

//Get a list of categories
app.get('/api/store/categories', (req, res) => {
    let getCategories = `SELECT * FROM categories`
    db.all(getCategories, (err, result) => {
        if(err){
            console.log(`Couldn't get a list of categories`, err)
            res.sendStatus(500)
        }else{
            res.status(200).json(result)
        }
    })
})

//Update category
app.put('/api/store/category/:id', (req, res) => {
    let categoryID = req.params.id
    let name = req.body.name
    let updateCategory = `UPDATE categories SET name = ? WHERE oid = ?`
    db.run(updateCategory, [name, categoryID], err => {
        if(err){
            console.log(`Couldn't update category`, err)
            res.sendStatus(500)
        }else{
            console.log(`Updated category successfully`)
            res.sendStatus(200)
        }
    })
})

//Get a list of all products in the store
app.get('/api/store/products', (req, res) => {
    let getAllProducts = "SELECT * FROM products"
    db.all(getAllProducts, (err, result) => {
        if(err){
            console.log(`Somehing happened getting the list of produts`, err)
            res.sendStatus(500)
        }
        res.status(200).json(result)
    })
})

//Get a single product by id
app.get('/api/store/product/:id', (req, res) => {
    let getProduct = `
    SELECT
        product_id, 
        products.name as product_name, 
        description, 
        image, 
        quantity, 
        price, 
        categories.name as category_name, 
        categories.category_id
    FROM
        products 
    JOIN 
        categories 
    USING 
        (category_id)
    WHERE
        products.product_id = ?`
    
    let productId = req.params.id
    db.get(getProduct, [productId], (err, result) => {
        if(err){
            console.log(`Couldn't get product with id: ${productId}`, err)
            res.sendStatus(500)
        }else{
            res.status(200).json(result)
        }
    })
})

//Add new products to the store
app.post('/api/store/product', (req, res) => {

    let addNewProduct = `INSERT INTO products (name, description, image, quantity, category_id, price) VALUES (?,?,?,?,?,?)`
    let category_id = req.body.category_id
    let name = req.body.name
    let description = req.body.description
    let image = req.body.image
    let quantity = parseInt(req.body.quantity)
    let price = parseFloat(req.body.price)

    db.run(addNewProduct, [name, description, image, quantity, category_id, price], err => {
        if(err){
            console.log(`Couldn't add ${name} to database`, err)
            res.sendStatus(500)
        }else{
            console.log(`Added ${name} to the database`)
            res.sendStatus(200)
        }
    })
})

//Update a product 
app.put('/api/store/product/:id', (req, res) => {
    let productID = parseInt(req.params.id)

    let queryHelper = Object.keys(req.body).map(ele => `${ele.toUpperCase()} = ?`)

    let queryValues = [...Object.values(req.body), productID]

    let updateProduct = `UPDATE products SET ${queryHelper.join(', ')} WHERE oid = ?`

    console.log(updateProduct)
    console.log(queryValues)
    db.run(updateProduct, queryValues, err => {
        if(err){
            console.log(`Something went wrong updating product with id ${productID}`, err)
            res.sendStatus(500)
        }else{
            console.log(`Update to products with id ${productID} successful`)
            res.sendStatus(200)
        }
    })
})

//Delete product 
app.delete('/api/store/product/:id', (req, res) => {
    let prodcutID = req.params.id
    let deleteProduct = `DELETE FROM products WHERE oid = ?`
    let deleteOrderItems = `DELETE FROM order_items WHERE order_items.product_id IN (SELECT oid FROM products WHERE oid = ?)`
    db.run(deleteOrderItems, [prodcutID], err => {
        if(err){
            console.log(`Couldn't remove products from order_items`, err)
            res.sendStatus(500)
        }else{
            db.run(deleteProduct, [prodcutID], err => {
                if(err){
                    console.log(`Couldn't remove product`, err)
                    res.sendStatus(500)
                }else{
                    console.log(`Deleted product successfully`)
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

//Update an order 
app.put('/api/store/order/:id', (req, res) => {
    let orderID = req.params.id
    let status = req.body.status
    let date = null
    if(status == 'Shipped')
        date = Date(Date.now())
    
    let updateOrderShipped = `UPDATE orders SET status = ?, shipped_date = ? WHERE oid = ?`
    db.run(updateOrderShipped, [status, date, orderID], err => {
        if(err){
            console.log(`Couldn't update order ${orderID} to shipped`)
            res.sendStatus(500)
        }else{
            res.sendStatus(200)
        }
    })
})

//View an order
app.get('/api/store/order/:id', (req, res) => {
    let orderID = req.params.id
    let getOrderInfo = `
    SELECT
        orders.status, 
        orders.order_date, 
        orders.shipped_date,
        order_items.quantity,
        order_items.list_price,
        products.name
    FROM 
        orders 
    JOIN 
        order_items on orders.oid = order_items.order_id
    JOIN 
        products on products.oid = order_items.oid
    WHERE 
        orders.oid = ?`
    db.all(getOrderInfo, [orderID], (err, result) => {
        if(err){
            console.log(`Coulnd't get order information`, err)
            res.sendStatus(500)
        }else{
            console.log(`Getting order data successful`)
            res.status(200).json(result)
        }
    })
})

//Add items to pending order for customer ID (add order_items)
app.post('/api/store/order/:o_id/product/:p_id', (req, res) => {
    let orderID = parseInt(req.params.o_id)
    let prodcutID = parseInt(req.params.p_id)
    let quantity = parseInt(req.body.quantity)
    let discount = parseInt(req.body.discount)
    let getStatus = `SELECT status FROM orders WHERE oid = ?`
    let addProductToOrder = `INSERT INTO order_items values (?,?,?,?,?)`
    let getCurrentPrice = `SELECT price FROM products WHERE oid = ?`
    let adjustQuantity = `UPDATE products SET quantity = ? WHERE oid = ?`
    
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
                    db.run(adjustQuantity, [quantity, prodcutID], err => {
                        if(err){
                            console.log(`Couldn't update qantity of products`, err)
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
        }
    })
})

//Delete a product from an order (delete order_items)
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

//Update quantity of product for an order (update order_items)
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



app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`)
})