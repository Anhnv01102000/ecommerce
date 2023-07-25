const Category = require("../models/category")
const asyncHandler = require("express-async-handler")

const createCategory = asyncHandler(async (req, res) => {
    const response = await Category.create(req.body)
    return res.status(200).json({
        success: response ? true : false,
        createCategory: response ? response : "Cannot create new category"
    })
})

const getCategories = asyncHandler(async (req, res) => {
    const response = await Category.find().select('name _id')
    return res.status(200).json({
        success: response ? true : false,
        categories: response ? response : "Cannot get categories"
    })
})

const updateCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params
    console.log(req.body);
    const response = await Category.findByIdAndUpdate(cid, req.body, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        updateCategory: response ? response : "Cannot update category"
    })
})

const deleteCategory = asyncHandler(async (req, res) => {
    const { cid } = req.params
    const response = await Category.findByIdAndDelete(cid)
    return res.status(200).json({
        success: response ? true : false,
        deleteCategory: response ? response : "Cannot delete category"
    })
})

module.exports = {
    createCategory,
    getCategories,
    updateCategory,
    deleteCategory
}