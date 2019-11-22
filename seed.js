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
        category_id: "SELECT id FROM categories WHERE name == 'Sporting Goods'", 
        price: 499.95
    },
    {
        name: `Samsung 65" LED Q60 Smart 4K UHD TV`,
        quantity: 10,
        category_id: `SELECT id FROM categories WHERE name == 'Electronics'`, 
        price: 1199.95,
    },
    {
        name: "DreamCloud Queen Mattress - Luxury Hybrid Mattress",
        quantity: 7,
        category_id:"SELECT id FROM categories WHERE name = 'Home Goods'", 
        price: 1199,
    },
    {
        name: "Men's Campshire Pullover Hoodie",
        quantity: 400,
        category_id: "SELECT id FROM categories WHERE name = 'Clothing'", 
        price: 149,
    },
    {
        name: "Schwinn 700C Phocus 1600 Men's Road Bike",
        quantity: 12,
        category_id: "SELECT id FROM categories WHERE name ='Sporting Goods'", 
        price: 449.99,
    }
]

let deleteFromCustomer = "DELETE FROM customers"
let insertIntoCustomers = "INSERT INTO customers values(?,?,?,?,?,?,?,?)"

db.run(deleteFromCustomer, err => {
    if(err){
        console.log('There was an error deleting from customers')
    }else
        customers.forEach(user => {
            db.run(insertIntoCustomers, [user.first_name, user.last_name, user.email, user.address, user.city, user.state, user.zip, user.phone], err => {
                if(err){
                    console.log(`Couldn't insert ${user.first_name} into database`)
                }else{
                    console.log(`Inserted ${user.first_name} into database`)
                }
            })
        })
})
