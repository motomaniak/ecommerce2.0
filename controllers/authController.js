let bcrypt = require('bcryptjs')
let validate = require('../validation/register')
let db = require('./database')
let jwt = require('jsonwebtoken')
let express = require('express')
let app = express.app()

let register = (req, res) => {
    let {errors, notValid} = validate(req.body)

    if(notValid){
        return res.status(400).json({status: 400, errors})
    }

    db.run(db.getUser, [req.body.email])
}