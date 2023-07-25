const Order = require("../models/order")
const User = require("../models/user")

const asyncHandler = require("express-async-handler")

const createOrder = asyncHandler(async (req, res) => {
    const response = await Order.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong",
    })
})

const updateStatusOrder = asyncHandler(async (req, res) => {
    const { oid } = req.params
    const { status } = req.body
    if (!status) throw new Error("Missing inputs")
    const response = await Order.findByIdAndUpdate(oid, { status }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})

const getOrderAdmin = asyncHandler(async (req, res) => {
    const response = await Order.find()
    return res.status(200).json({
        success: response ? true : false,
        response: response ? response : "Something went wrong"
    })
})


module.exports = {
    createOrder,
    updateStatusOrder,
    getOrderAdmin
}