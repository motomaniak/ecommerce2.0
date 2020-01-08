let bcrypt = require('bcryptjs')
let db = require('../database')
let jwt = require('jsonwebtoken')

let register = (req, res) => {
    // let {errors, notValid} = validate(req.body)

    // if(notValid){
    //     return res.status(400).json({status: 400, errors})
    // }
    let getUser = 'SELECT customer_id FROM customers WHERE email = ?'
    db.get(getUser, [req.body.email], (err, result) => {
        if(err){
            return res.status(500).json({
                status: 500,
                message:'Something went wrong. Please try again'
            })
        }

        if(result){
            return res.status(400).json({
                status:400,
                message:'Email address has already been registered'
            })
        }

        bcrypt.genSalt(10, (err, salt) => {
            if(err){
                return res.status(500).json({
                    status:500,
                    message:'Something went wrong please try again'
                })
            }

            bcrypt.hash(req.body.password, salt, (err, hash) => {
                if(err){
                    return res.status(500).json({
                        status:500,
                        message:'Something went wrong please try again'
                    }) 
                }

                let sqlNewCustomer = 'INSERT INTO customers (email, password) VALUES (?, ?)'
                db.run(sqlNewCustomer, [req.body.email, hash], (err) => {
                    if(err){
                        return res.status(500).json({
                            status: 500,
                            message: 'Something went wrong try again'
                        })
                    }
                    res.status(200).json({
                        status:200,
                        message: 'Customer added successfully'
                    })
                })

            })
        })
    })
}

let login = (req, res) => {
    
    if(!req.body.email || !req.body.password){
        return res.status(400).json({status:400, message:"Please enter your email and password"})
    }

    db.get('SELECT customer_id, email, password FROM customers WHERE email = ?', [req.body.email], (err, result) => {
        if(err){
            return res.status(500).json({status:500, message:"Something went wrong. Please try again"})
        }
        if(!result){
            return res.status(400).json({status:400, message:"Username or password is incorrect."})
        }
        
        bcrypt.compare(req.body.password, result.password, (err, isMatch) => {
            if(err){
                return res.status(500).json({status:500, message:"Username or password incorrect. Please try again.", err: err})
            }
            console.log(isMatch)
            if(isMatch){
                let user = {
                    customer_id: result.customer_id
                }
                jwt.sign(user, "ecommercesite", {expiresIn: '1hr'}, (err, signedJwt) => {
                    return res.status(200).json({status:200, message: 'Success', id: result.customer_id, signedJwt})
                })
            } else {
                return res.status(400).json({
                    status: 400,
                    message: 'Username or password is incorrect'
                })
            }
        })
    })
}

module.exports = {
    login,
    register
}