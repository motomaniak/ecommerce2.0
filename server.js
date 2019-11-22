let express = require('express')
let db = require('./database')
const PORT = 9000

let app = express()

app.listen(PORT, ()=> {
    console.log(`App listening on port ${PORT}`)
})