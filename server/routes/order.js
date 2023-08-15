const router = require('express').Router()
const ctrls = require('../controllers/order')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post("/", ctrls.createOrder)
router.get("/", [verifyAccessToken], ctrls.getOrder)

module.exports = router