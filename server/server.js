const express = require('express')
require('dotenv').config()
const dbConnect = require("./configs/dbconnect")
const initRoutes = require("./routes")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')


const app = express()
const port = process.env.PORT || 8888

var cors = require('cors')

app.use(cors())
app.use(cookieParser())
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log("server running on the port: " + port);
})