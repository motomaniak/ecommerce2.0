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
            res.json(result)
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



app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`)
})