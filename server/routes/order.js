const router = require('express').Router()
const ctrls = require('../controllers/order')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post("/", [verifyAccessToken], ctrls.createOrder)
router.put("/status/:oid", [verifyAccessToken], ctrls.updateStatusOrder)
router.get("/", [verifyAccessToken], ctrls.getOrderAdmin)

module.exports = router