const Product = require("../models/product")
const asyncHandler = require("express-async-handler")

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, category } = req.body
    // console.log(typeof ((req.files['images'])));
    console.log((req.files));

    const images = req.files['images']?.map(el => el.path)
    // // console.log(req.files['images']?.map(el => el.path));

    if (images) req.body.images = images
    // console.log(req.body);
    const newProduct = (await Product.create(req.body))
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cannot create new product",
    })
})

const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        products: product ? product : "Cannot get product"
    })
})

// Filtering, sorting & pagination
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    // Tách các trường đặc biệt ra khỏi query
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])
    // Format lại các operators cho đúng cú pháp của mongoose
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    const formatQueries = JSON.parse(queryString)

    // Filtering
    if (queries?.name) formatQueries.name = { $regex: queries.name, $options: "i" }
    let queryCommand = Product.find(formatQueries)

    // Sorting
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(" ")
        queryCommand = queryCommand.sort(sortBy)
    }

    // Fields limitting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(" ")
        queryCommand = queryCommand.select(fields)
    }

    // Pagination
    // limit: số phần tử 1 trang
    // skip: giá trị bỏ qua
    const page = +req.query.page || 1
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)

    // Excute query
    // Số lượng sản phẩm thỏa mãn điều kiện !== số lượng sản phẩm trả về 1 lần gọi Api
    queryCommand.exec(async (err, response) => {
        if (err) throw new Error(err)
        const counts = await Product.find(formatQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            products: response ? response : "Cannot get products",
            counts
        })
    })
})

const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const { name, price, description, category } = req.body
    // console.log(typeof ((req.files['images'])));
    console.log((req.files));

    const images = req.files['images']?.map(el => el.path)
    // // console.log(req.files['images']?.map(el => el.path));

    if (images) req.body.images = images
    const updateProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updateProduct ? true : false,
        updateProduct: updateProduct ? updateProduct : "Cannot update product"
    })
})

const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deleteProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deleteProduct ? true : false,
        deleteProduct: deleteProduct ? deleteProduct : "Cannot delete product"
    })
})

const ratings = asyncHandler(async (req, res) => {
    const { postedBy, star, comment, pid } = req.body
    if (!postedBy || !star || !pid) throw new Error("Missing inputs")
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.ratings?.find(el => el.postedBy == postedBy)
    if (alreadyRating) {
        // Update star & comment
        await Product.updateOne(
            { ratings: { $elemMatch: alreadyRating } },
            { $set: { "ratings.$.star": star, "ratings.$.comment": comment } },
            { new: true }
        )
    } else {
        // Add ratings
        await Product.findByIdAndUpdate(
            pid,
            { $push: { ratings: { star, comment, postedBy } } },
            { new: true })
    }

    // Total ratings
    const updateProduct = await Product.findById(pid)
    const ratingCount = updateProduct.ratings.length
    const sumRatings = updateProduct.ratings.reduce((sum, el) => sum + +el.star, 0)
    updateProduct.totalRatings = (sumRatings / ratingCount).toFixed(1)
    await updateProduct.save()

    return res.status(200).json({
        status: true,
        updateProduct
    })
})

const uploadImagesProduct = asyncHandler(async (req, res) => {
    const files = req.files?.map(el => el.path)
    // console.log(req.files?.map(el => el.path));
    if (!files) throw new Error("Missing inputs")
    return res.status(200).json({
        success: true,
        files
    })
})

module.exports = {
    createProduct,
    getProduct,
    getAllProduct,
    updateProduct,
    deleteProduct,
    ratings,
    uploadImagesProduct
}