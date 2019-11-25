const db = require('./database.js')


const customers = [
    {
        first_name: "John", 
        last_name: "Smith", 
        email: "JSmith@email.com", 
        address: "123 Main st", 
        city: "Minneapolis", 
        state: "MN", 
        zip: 55401, 
        phone: 5551228847
    },
    {
        first_name: "Ariana", 
        last_name: "Jones", 
        email: "AJones@email.com", 
        address: "483 S Broadway", 
        city: "Seattle", 
        state: "WA", 
        zip: 98101, 
        phone: 5555228356
    },
    {
        first_name: "Luke", 
        last_name: "Perry", 
        email: "LPerry@email.com", 
        address: "4490 1st St", 
        city: "Dallas", 
        state: "TX", 
        zip: 75250, 
        phone: 5552149876
    }

]

const categories = [
    {name: "Electronics"},
    {name: "Home Goods"},
    {name: "Clothing"},
    {name: "Sporting Goods"},
]

const products = [
    {
        name: "Burton Flying V Snowboard 2020",
        quantity: 12,
        category: 'Sporting Goods', 
        price: 499.95
    },
    {
        name: `Samsung 65" LED Q60 Smart 4K UHD TV`,
        quantity: 10,
        category: 'Electronics', 
        price: 1199.95,
    },
    {
        name: "DreamCloud Queen Mattress - Luxury Hybrid Mattress",
        quantity: 7,
        category: 'Home Goods', 
        price: 1199,
    },
    {
        name: "Men's Campshire Pullover Hoodie",
        quantity: 400,
        category: "Clothing", 
        price: 149,
    },
    {
        name: "Schwinn 700C Phocus 1600 Men's Road Bike",
        quantity: 12,
        category: 'Sporting Goods', 
        price: 449.99,
    }
]

let orders = [
    {
        customer_id: 1,
        status: `Pending`,
        order_date: Date(Date.now()),
        shipped_date: null,
    },
    {
        customer_id: 2,
        status: `Shipped`,
        order_date: Date(Date.now()),
        shipped_date: Date(Date.now()),
    },
    {
        customer_id: 3,
        status: `Processing`,
        order_date: Date(Date.now()),
        shipped_date: null,
    }

]

let ordersItems = [
    {
        product_id: 1,
        order_id: 1,
        quantity: 1, 
        discount: 15,
        price: 499.95
    },
    {
        product_id: 2,
        order_id: 1,
        quantity: 1, 
        discount: 0,
        price: 1199.95
    },
    {
        product_id: 4,
        order_id: 2,
        quantity: 1, 
        discount: 0,
        price: 149
    },
    {
        product_id: 2,
        order_id: 3,
        quantity: 2, 
        discount: 0,
        price: 1199.95
    },
    {
        product_id: 3,
        order_id: 3,
        quantity: 15, 
        discount: 0,
        price: 1199
    },
    {
        product_id: 5,
        order_id: 3,
        quantity: 100, 
        discount: 20,
        price: 449.99
    }
]

let deleteFromCustomer = "DELETE FROM customers"
let insertIntoCustomers = "INSERT INTO customers values(?,?,?,?,?,?,?,?)"

let insertIntoCategories = "INSERT INTO CATEGORIES VALUES (?)"
let deleteFromProducts = "DELETE FROM products"
let insertIntoProducts = "INSERT INTO products VALUES (?,?,?,?)"
let deleteFromCategories = "DELETE FROM categories"
let deleteFromOrders = "DELETE FROM orders"
let insertIntoOrders = "INSERT INTO orders VALUES (?,?,?,?)"
let deleteFromOrderItems = "DELETE FROM order_items"
let insertIntoOrderItems = "INSERT INTO order_items VALUES (?,?,?,?,?)"
db.serialize(() =>{
    db.run(deleteFromProducts, err => {
        if(err)
            console.log("Couldn't delete from products ", err)
    })
    
    db.run(deleteFromCategories, err => {
        if(err)
            console.log("Couldn't delete from products ", err)
    })

    db.run(deleteFromOrders, err => {
        if(err)
            console.log("Couldn't delete from orders ", err)
    })

    db.run(deleteFromOrderItems, err => {
        if(err)
            console.log("Couldn't delete from order items ", err)
    })  

    db.run(deleteFromCustomer, err => {
        if(err)
            console.log("Couldn't delete customers")
    })

    customers.forEach(customer => {
        db.run(insertIntoCustomers, [customer.first_name, customer.last_name, customer.email, customer.address, customer.city, customer.state, customer.zip, customer.phone], err => {
            if(err)
                console.log(`Couldn't insert ${customer.first_name} into database`)
        })
    })
    
    categories.forEach(category => {
        db.serialize(()=>{
            db.run(insertIntoCategories, [category.name], err => {
                if(err){
                    console.log(`Couldn't insert ${category.name} into database`)
                }
            })
        })  
    })

    
    products.forEach(product => {
        let getCategoryId = "SELECT oid FROM categories WHERE name = ?"
        db.get(getCategoryId, product.category, (err, result) => {
            if(err)
                console.log(`Couldn't get category id of ${product.category}`)
            else{
                db.run(insertIntoProducts, [product.name, product.quantity, result.rowid, product.price], err => {
                    if(err){
                        console.log(`Couldn't insert ${product.name} into database`)
                    }else{
                        console.log(`Inserted ${product.name} into database`)
                    }
                })
            }
        })  
    })
    

    orders.forEach(order => {
        db.run(insertIntoOrders, [order.customer_id, order.status, order.order_date, order.shipped_date], err => {
            if(err){
                console.log(`Couldn't insert ${category.name} into database`)
            }
        })
    })
    

    ordersItems.forEach(item => {
        db.run(insertIntoOrderItems, [item.product_id, item.order_id, item.quantity, item.price, item.discount], err => {
            if(err){
                console.log(`Couldn't insert ${item.product_id} into database`)
            }else{
                console.log(`Inserted ${item.product_id} into database`)
            }
        })
    })

})




