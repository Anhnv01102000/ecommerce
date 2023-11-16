const Order = require("../models/order")
const User = require("../models/user")

const asyncHandler = require("express-async-handler")

const createOrder = asyncHandler(async (req, res) => {
    const response = await Order.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createOrder: response ? response : "Something went wrong",
    })
})

const getOrder = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        orders: response ? response : "Something went wrong"
    })
})


module.exports = {
    createOrder,
    getOrder
}