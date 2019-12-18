const db = require('./database.js')


const customers = [
    {
        customer_id: 1,
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
        customer_id: 2,
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
        customer_id: 3,
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
    {category_id: 1, name: "Electronics"},
    {category_id: 2, name: "Home Goods"},
    {category_id: 3, name: "Clothing"},
    {category_id: 4, name: "Sporting Goods"},
]

const products = [
    {
        product_id: 1,
        name: "Burton Flying V Snowboard 2020",
        description: `
        Pro-Tip A tapered tip and tail thickness reduces swing weight for easier mobility.
        Twin Flex The flex is perfectly symmetrical from tip to tail for a balanced ride that's equally versatile regular or switch.
        Sintered WFO Infusing a specially formulated wax deep into the pores of this extra-absorbent, high-density sintered material results in an ultra-durable base that stays wide open all season and in any condition.
        Infinite Ride This Burton-exclusive technology allows maximized pop and strength by overbuilding the board, then putting it in a machine that breaks in the board for you. Whether you choose to ride Flat Top, Flying V, or Camber, rest assured that with Infinite Ride your board will maintain its flex, pop, and feel from the first day forward, season after season.
        The Channel Mounting System Stronger, faster, easier, and more adjustable -- The Channel gives you ultimate control of your stance and your board in a design compatible with all major bindings (not just Burton's).
        `,
        image: 'https://images-na.ssl-images-amazon.com/images/I/41JbqAxEIfL._AC_SL1002_.jpg',
        quantity: 12,
        category: 'Sporting Goods', 
        price: 499.95
    },
    {
        product_id: 2,
        name: `Samsung QN65Q60RAFXZA Flat 65-Inch QLED 4K Q60 Series Ultra HD Smart TV with HDR and Alexa Compatibility (2019 Model)`,
        description: `
        100 Percentage COLOR VOLUME WITH QUANTUM DOTS; Powered by Quantum dots, Samsung’s 4K QLED TV offers over a billion shades of brilliant color and 100 Percentage color volume for exceptional depth of detail that will draw you in to the picture for the best 4K TV experience
        QUANTUM PROCESSOR 4K; Intelligently powered processor instantly upscales content to 4K for sharp detail and refined color
        QUANTUM HDR 4X; 4K depth of detail with high dynamic range powered by HDR10+ delivers the lightest to darkest colors, scene by scene, for amazing picture realism
        AMBIENT MODE; Customizes and complements your living space by turning a blank screen of this big screen TV into enticing visuals including décor, info, photos and artwork
        SMART TV FEATURES; OneRemote to control all compatible devices, Bixby voice command, on-screen universal guide, SmartThings to control compatible home appliances and devices, smart speaker expandability with Alexa and Google Assistant compatibility, and more
        `,
        image: 'https://images-na.ssl-images-amazon.com/images/I/716SrHQrbjL._AC_SL1500_.jpg',
        quantity: 10,
        category: 'Electronics', 
        price: 1199.95,
    },
    {
        product_id: 3,
        name: "DreamCloud Queen Mattress - Luxury Hybrid Mattress",
        description: ` STAY COOL THROUGH THE NIGHT - Gel-infused memory foam does double duty, providing you with unparalleled heat distribution and support that contours perfectly to your body.
        INDUSTRY LEADING 180 NIGHT TRIAL- You can try DreamCloud risk-free for 180 days and return it if you are not 100% happy (180 day trial is for orders on Amazon only). This is nearly 3 months longer than the industry standard.
        DREAMCLOUD EVERLONG WARRANTY - We guarantee DreamCloud for as long as you own the mattress. Longest warranty in the business (we checked).
        OPTIMIZED - For Side, Back, and Stomach Sleepers. Designed to offer the perfect balance of contouring comfort and pushback support. `,
        image: 'https://images-na.ssl-images-amazon.com/images/I/716uHarDZkL._AC_SL1500_.jpg', 
        quantity: 7,
        category: 'Home Goods', 
        price: 1199,
    },
    {
        product_id: 4,
        name: "Men's Campshire Pullover Hoodie",
        description: `Warm and ultra-soft Sherpa fleece pullover hoodie for getting a little more comfortable at the mountain cabin.`,
        image: 'https://images.thenorthface.com/is/image/TheNorthFace/NF0A3YRS_G45_hero?$638x745$',
        quantity: 400,
        category: "Clothing", 
        price: 149,
    },
    {
        product_id: 5,
        name: "Schwinn 700C Phocus 1600 Men's Road Bike",
        description: `Get your motor legs a running the Schwinn Phocus Road bike invites you to focus on your riding and getting in shape! The Phocus is a great fitness ride with plenty of features that will have you comparing it to the performance brands. The Phocus has an aluminum fitness frame with a carbon fiber road fork. This keeps the weight down and gives you superior control over the bike for great responsive handling. There is a microshift 14-speed integrated shifter/brake lever so you never have to reach to far to control the action. The 14 speeds are governed by a Shimano rear derailleur for precise shifting. The Promax alloy caliper brakes assure sure stops. Double-wall alloy wheel rims keep the wheels light, and strong and thin road tires offer fast and smooth riding. Nothing is going to break your stride on this bike. `,
        image: 'https://i5.walmartimages.com/asr/1c220e78-7958-4f07-bb21-5a709fe37cbe_1.befb1008b436514b88d76db19d0977bd.jpeg?odnWidth=undefined&odnHeight=undefined&odnBg=ffffff',
        quantity: 12,
        category: 'Sporting Goods', 
        price: 449.99,
    }
]

let orders = [
    {
        order_id: 1,
        customer_id: 1,
        status: `Pending`,
        order_date: Date(Date.now()),
        shipped_date: null,
    },
    {
        order_id: 2,
        customer_id: 2,
        status: `Shipped`,
        order_date: Date(Date.now()),
        shipped_date: Date(Date.now()),
    },
    {
        order_id: 3,
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
let insertIntoCustomers = "INSERT INTO customers values(?,?,?,?,?,?,?,?,?)"

let insertIntoCategories = "INSERT INTO CATEGORIES VALUES (?,?)"
let deleteFromProducts = "DELETE FROM products"
let insertIntoProducts = "INSERT INTO products VALUES (?,?,?,?,?,?,?)"
let deleteFromCategories = "DELETE FROM categories"
let deleteFromOrders = "DELETE FROM orders"
let insertIntoOrders = "INSERT INTO orders VALUES (?,?,?,?,?)"
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
        db.run(insertIntoCustomers, [customer.customer_id, customer.first_name, customer.last_name, customer.email, customer.address, customer.city, customer.state, customer.zip, customer.phone], err => {
            if(err)
                console.log(`Couldn't insert ${customer.first_name} into database`, err)
        })
    })
    
    categories.forEach(category => {
        db.serialize(()=>{
            db.run(insertIntoCategories, [category.category_id, category.name], err => {
                if(err){
                    console.log(`Couldn't insert ${category.name} into database`, err)
                }
            })
        })  
    })

    
    products.forEach(product => {
        let getCategoryId = "SELECT category_id FROM categories WHERE name = ?"
        db.get(getCategoryId, product.category, (err, result) => {
            if(err)
                console.log(`Couldn't get category id of ${product.category}`)
            else{
                db.run(insertIntoProducts, [product.product_id, product.name, product.description, product.image, product.quantity, result.category_id, product.price], err => {
                    if(err){
                        console.log(`Couldn't insert ${product.name} into database`, err)
                    }else{
                        console.log(`Inserted ${product.name} into database`)
                    }
                })
            }
        })  
    })
    

    orders.forEach(order => {
        db.run(insertIntoOrders, [order.order_id, order.customer_id, order.status, order.order_date, order.shipped_date], err => {
            if(err){
                console.log(`Couldn't insert order into database`, err)
            }
        })
    })
    

    ordersItems.forEach(item => {
        db.run(insertIntoOrderItems, [item.product_id, item.order_id, item.quantity, item.price, item.discount], err => {
            if(err){
                console.log(`Couldn't insert ${item.product_id} into database`, err)
            }else{
                console.log(`Inserted ${item.product_id} into database`)
            }
        })
    })

})




