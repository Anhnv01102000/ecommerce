const User = require("../models/user")
const asyncHandler = require('express-async-handler')
const { gennerateAccessToken, gennerateRefreshToken } = require('../middlewares/jwt')
const jwt = require('jsonwebtoken')
const sendMail = require("../ultils/sendMail")
const crypto = require('crypto')

const Register = asyncHandler(async (req, res) => {
    const { email, password, name, address, mobile } = req.body
    console.log(req.body);
    if (!email || !password || !name || !address || !mobile) {
        return res.status(400).json({
            success: false,
            message: "Mising inputs"
        })
    }
    const user = await User.findOne({ email }) || await User.findOne({ mobile })
    if (user) {
        throw new Error("User has existed!")
    } else {
        const newUser = await User.create(req.body)
        return res.status(200).json({
            success: newUser ? true : false,
            message: newUser ? "Register is successfully." : "Something went wrong"
        })
    }
})

// Refresh Token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền người dùng

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Mising inputs"
        })
    }
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        // Tách password và role ra khỏi response
        const { password, role, ...userData } = response.toObject()
        // Tạo access token
        const accessToken = gennerateAccessToken(response._id)
        // Tạo refresh token
        const refreshToken = gennerateRefreshToken(response._id)
        // Lưu refresh token vào db
        await User.findByIdAndUpdate(response._id, { refreshToken }, { new: true })
        return res.status(200).json({
            success: true,
            accessToken,
            refreshToken,
            userData
        })
    } else {
        throw new Error('Invalid Credential!')
    }
})

const getCurrent = asyncHandler(async (req, res) => {
    const { id } = req.user
    const user = await User.findById(id).select(' -refreshToken -password -role')
    return res.status(200).json({
        success: user ? true : false,
        response: user ? user : "User not found"
    })
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body
    // console.log(refreshToken);
    // Check token có hợp lệ hay không
    const rs = await jwt.verify(refreshToken, process.env.JWT_SECRET)
    // console.log(rs);
    const response = await User.findOne({ _id: rs.id, refreshToken })
    // console.log(response);
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? gennerateAccessToken(response._id, response.role) : "Refresh Token not matched"
    })

})

const logout = asyncHandler(async (req, res) => {
    const { refreshToken } = req.body
    if (!refreshToken) {
        throw new Error("No fresh token")
    } else {
        // Xóa refresh token ở db
        await User.findOneAndUpdate({ refreshToken }, { refreshToken: "" }, { new: true })
        return res.status(200).json({
            success: true,
            message: "Logout is done"
        })
    }
})

// Client gửi email
// Server check email có hợp lệ không => Gửi mail + kèm theo link (token thay đổi password)
// Client check email => Click vào link đã gửi trong email
// Client gửi api kèm theo token
// Check token có giống với token mà server gửi mail hay không
// Change password

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) {
        throw new Error('Missing Email')
    } else {
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error('User not found')
        } else {
            const resetToken = user.passwordChangeToken()
            await user.save()

            const html =
                `
                Xin vui lòng click vào link dưới đây để thay đổi mật khẩu. Link này sẽ hết hạn sau 15 phút.
                <a href = ${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click Here</a>
                `
            const data = {
                email,
                html
            }

            const rs = await sendMail(data)
            return res.status(200).json({
                success: true,
                rs
            })
        }
    }
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error("Missing input")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpires: { $gt: Date.now() } })
    if (!user) {
        throw new Error("Invalid Reset Token")
    } else {
        user.password = password
        user.passwordResetToken = undefined
        user.passwordChangeAt = Date.now()
        user.passwordResetExpires = undefined
        await user.save()
        return res.status(200).json({
            success: user ? true : false,
            message: user ? "Updated password" : "Something went wrong"
        })
    }
})

// Filtering, sorting & pagination
const getUsers = asyncHandler(async (req, res) => {
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
    let queryCommand = User.find(formatQueries)

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
        const counts = await User.find(formatQueries).countDocuments()
        return res.status(200).json({
            success: response ? true : false,
            users: response ? response : "Cannot get products",
            counts
        })
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (!uid) throw new Error("Missing input")
    const response = await User.findByIdAndDelete(uid)
    return res.status(200).json({
        success: response ? true : false,
        deleteUser: response ? `User with email ${response.email} deleted` : "No User delete"
    })
})

const updateUser = asyncHandler(async (req, res) => {
    const { uid } = req.params
    const { email, password, name, address, mobile, role } = req.body
    if (!email || !password || !name || !address || !mobile || !role) {
        return res.status(400).json({
            success: false,
            message: "Mising inputs"
        })
    }
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select(' -refreshToken -password -role')
    return res.status(200).json({
        success: response ? true : false,
        updateUser: response ? response : "Something went wrong"
    })
})

// const addCart = asyncHandler(async (req, res) => {
//     const { id } = req.user
//     const { pid, quantity } = req.body
//     if (!pid || !quantity) throw new Error("Missing inputs")
//     const user = await User.findById(id)
//     const alreadyProduct = user?.cart?.find(el => el.product.toString() == pid)
//     if (alreadyProduct) {
//         const response = await User.updateOne(
//             { cart: { $elemMatch: alreadyProduct } },
//             { $set: { "cart.$.quantity": quantity } },
//             { new: true }
//         )
//         return res.status(200).json({
//             success: response ? true : false,
//             updateUser: response ? response : "Someting went wrong"
//         })
//     } else {
//         const response = await User.findByIdAndUpdate(
//             id,
//             { $push: { cart: { product: pid, quantity } } },
//             { new: true }
//         )
//         return res.status(200).json({
//             success: response ? true : false,
//             updateUser: response ? response : "Someting went wrong"
//         })
//     }
// })
module.exports = {
    Register,
    login,
    getCurrent,
    refreshAccessToken,
    logout,
    forgotPassword,
    resetPassword,
    getUsers,
    deleteUser,
    updateUser,
}