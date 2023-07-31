const jwt = require('jsonwebtoken')

const gennerateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2d" })
}
const gennerateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" })
}

module.exports = {
    gennerateAccessToken, gennerateRefreshToken
}