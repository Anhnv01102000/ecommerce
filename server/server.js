const express = require('express')
require('dotenv').config()
const dbConnect = require("./configs/dbconnect")
const initRoutes = require("./routes")
const cookieParser = require('cookie-parser')

const app = express()
const port = process.env.PORT || 8888

var cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(cookieParser())
dbConnect()
initRoutes(app)

app.listen(port, () => {
    console.log("server running on the port: " + port);
})