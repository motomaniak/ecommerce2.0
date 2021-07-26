# ECommerce Store

## Other Links to repos
React Front end:
https://github.com/motomaniak/ecommerce2.0-frontend
Python Backend Version:
https://github.com/motomaniak/ecommerce-python
Vue Frontend Version:
https://github.com/motomaniak/ecommerce-vue

## Table Of Contents
1. GET '/api/store/customer/:id'
2. PUT '/api/store/customer/:id'
3. DELETE '/api/store/customer/:id'
4. POST '/api/store/customer/'
5. GET '/api/store/customer/:id/orders'
6. POST '/api/store/categories'
7. DELETE '/api/store/category/:id'
8. GET '/api/store/categories'
9. PUT '/api/store/category/:id'
10. GET '/api/store/products'
11. POST '/api/store/prodcut'
12. PUT '/api/store/product/:id'
13. DELETE '/api/store/product/:id'
14. POST '/api/store/customer/:id/order'
15. PUT '/api/store/order/:id'
16. GET '/api/store/order/:id'
17. POST '/api/store/order/:o_id/product/:p_id'
18. DELETE '/api/store/order/:o_id/product/:p_id'
19. PUT '/api/store/order/:o_id/product/:p_id'

## Technologies Used
1. Node.js
2. Express.js 
3. SQLite3

## 1. GET '/api/store/customer/:id'
Returns information associated with a given customer for :id 

Returned Information: 
```json
{
    "first_name": "Luke",
    "last_name": "Perry",
    "email": "LPerry@email.com",
    "address": "4490 1st St",
    "city": "Dallas",
    "state": "TX",
    "zip": 75250,
    "phone": 5552149876
}
```

Name|Description|Type
---|---|---
first_name|Customers First Name|Text
last_name|Customers Last Name|Text
email|Customers email address, must be unique|Text
address|Customers street address|Text
city|Customers city|Text
state|Customers State|Text
zip|Customers zip code|Integer
phone|Customer phone number|Integer

## 2. PUT '/api/store/customer/:id'
Updates customer information associated with a given customer for :id.
All fields are optional for updating but email must be unique and not null

Information Sent:
```json
{
    "first_name": "Luke",
    "last_name": "Perry",
    "email": "LPerry@email.com",
    "address": "4490 1st St",
    "city": "Dallas",
    "state": "TX",
    "zip": 75250,
    "phone": 5552149876
}
```
Information Returned:
```
    "OK"
```
Or:
```
"Internal Sever Error"
```

Name|Description|Type
---|---|---
first_name|Customers First Name|Text
last_name|Customers Last Name|Text
email|Customers email address, must be unique|Text
address|Customers street address|Text
city|Customers city|Text
state|Customers State|Text
zip|Customers zip code|Integer
phone|Customer phone number|Integer

## 3. DELETE '/api/store/customer/:id'
Deletes a customer and all associated orders/items 

Information Returned:
```
"OK"
```
Or:
```
"Internal Server Error
```

## 4. POST '/api/store/customer/'
Adds a new customer to the database. Email address must be unique and cannot be null

Information Sent:
```json
{
    "first_name": "Luke",
    "last_name": "Perry",
    "email": "LPerry@email.com",
    "address": "4490 1st St",
    "city": "Dallas",
    "state": "TX",
    "zip": 75250,
    "phone": 5552149876
}
```
Information Returned:
```
    "ok"
```
Or:
```
"Internal Server Error"
```
Name|Description|Type
---|---|---
first_name|Customers First Name|Text
last_name|Customers Last Name|Text
email|Customers email address, must be unique|Text
address|Customers street address|Text
city|Customers city|Text
state|Customers State|Text
zip|Customers zip code|Integer
phone|Customer phone number|Integer

## 5. GET '/api/store/customer/:id/orders'

Information Returned:
```json
    {
        "rowid": 3,
        "status": "Shipped",
        "order_date": "Mon Nov 25 2019 09:21:30 GMT-0800 (Pacific Standard Time)",
        "shipped_date": "Sat Nov 30 2019 19:21:14 GMT-0800 (Pacific Standard Time)"
    }
```
Name|Description|Type
---|---|---
rowid|The order ID|Integer
status|Order status| Text
order_date|The date the order was placed|Text
shipped_date|The date the order shipped|Text

## 6. POST '/api/store/categories/'
Add the name for the given category

Information Sent:
```json
{
    "name":"Electronics"
}
```
Name|Description|Type
---|---|---
name|The name of a category|Text

## 7. DELETE '/api/store/category/:id'
Delete the category of the given id 

Information Returned: 
```
"OK"
```
Or:
```
"Internal Server Error"
```

## 8. GET '/api/store/categories'
Gets a list of all the current categories for products

Information Returned:
```json
{
    "name":"Electronics"
}
```
Or:
```
"Internal Sever Error"
```

Name|Description|Type
---|---|---
name|The name of a category|Text

## 9. PUT '/api/store/category/:id'
Updates a category name for the given ID 

Information Sent:
```json
{
    "name":"Electronics"
}
```
Information Returned:
``` 
"OK" 
```
Or:
```
"Internal Sever Error"
```

## 10. GET '/api/store/products'
Gets all the products for the store has to offer

Information Returned:
```json
    {
        "name": "Burton Flying V Snowboard 2020",
        "quantity": 12,
        "category_id": 4,
        "price": 499.95
    }
```
Or:
```
"Internal Server Error"
```

Name|Description|Type
---|---|---
name|The name of a product|Text
quantity|How many of given product is in inventory|Integer
category_id|The reference to the category table|Integer
price|The current cost of the product|Real

## 11. POST '/api/store/prodcut'
Add given product to the database 

Information Sent: 
```json
    {
        "name": "Burton Flying V Snowboard 2020",
        "quantity": 12,
        "category_id": "Sporting Goods",
        "price": 499.95
    }
```
Information Returned:
```
"OK"
```
Or:
```
"Internal Server Error"
```

Name|Description|Type
---|---|---
name|The name of a product|Text
quantity|How many of given product is in inventory|Integer
category_id|The category for the product|Text
price|The current cost of the product|Real

## 12. PUT '/api/store/product/:id'
Updates a product for given ID 

Information Sent: 
```json
    {
        "name": "Burton Flying V Snowboard 2020",
        "quantity": 12,
        "category_id": 4,
        "price": 499.95
    }
```

Name|Description|Type
---|---|---
name|The name of a product|Text
quantity|How many of given product is in inventory|Integer
category_id|The reference for the category table|Integer
price|The current cost of the product|Real

## 13. DELETE '/api/store/product/:id'
Delete the product for given ID. Will remove all references for product in order_items 

Information Returned: 
```
"OK"
```
Or:
```
"Internal Server Error"
```

## 14. POST '/api/store/customer/:id/order'
Starts a new order for the customer with given ID.

Information Returned: 
```
"OK"
```
Or:
```
"Internal Server Error"
```

## 15. PUT '/api/store/order/:id'
Update an order of given ID 

Information Sent: 
```json
    {
        "status":"Shipped"
    }
```
Information Returned:
```
"OK"
```
Or:
```
"Internal Server Error"
```

Name|Description|Type
---|---|---
status|One of "Pending" (An order isn't paid for and more products may be added), "Processing" (An order has been paid for and is being prepared to ship), or "Shipped" (An order is shipped to customer)|Text

## 16. GET '/api/store/order/:id'
Gets an order for given ID with all of the products in the order

Information Returned:
```json
    {
        "status": "Shipped",
        "order_date": "Mon Nov 25 2019 09:21:30 GMT-0800 (Pacific Standard Time)",
        "shipped_date": "Sat Nov 30 2019 19:21:14 GMT-0800 (Pacific Standard Time)",
        "quantity": 2,
        "list_price": 1199.95,
        "name": "Schwinn 700C Phocus 1600 Men's Road Bike"
    }
```
Or:
```
"Internal Server Error
```

Name|Description|Type
---|---|---
status|One of "Pending" (An order isn't paid for and more products may be added), "Processing" (An order has been paid for and is being prepared to ship), or "Shipped" (An order is shipped to customer)|Text
order_date|The date the order was started|Text
shipped_date|The date the order was shipped|Text
quantity|The number of a certain product|Integer
list_price|The price at the time the product was added to order|Real
name|The name of the product|Text

## 17. POST '/api/store/order/:o_id/product/:p_id'
Adds a product of given ID and order of given ID to order_items, this is what links a product to a particular order. Only orders that are pending may have products added to them. 

Information Sent:
```json
    {
        "quantity":12,
        "discount":.15
    }
```
Information Returned:
```
"OK"
```
Or:
```
"Internal Server Error"
```

Name|Description|Type
---|---|---
quantity|The amount of the given product beind added to the order|Integer
discount|The discount that's for the given item, must be between 0 and 1|Real

## 18. DELETE '/api/store/order/:o_id/product/:p_id'
Remove a product from a given order. Products can only be removed from pending orders 

Information Returned: 
```
"OK"
```
Or:
```
"Internal Server Error"
```

## 19. PUT '/api/store/order/:o_id/product/:p_id'
Update the quantity for the given product ID and Order ID 

Information Sent:
```json
    {
        "quantity":1
    }
```

Information Returned: 
```
"OK"
```
Or:
```
"Internal Server Error"
```

Name|Description|Type
---|---|---
quantity|The amount of the given product beind added to the order|Integer
