const router = require('express').Router()
const ctrls = require('../controllers/category')
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')

router.post("/", [verifyAccessToken], ctrls.createCategory)
router.get("/", ctrls.getCategories)
router.put("/:cid", [verifyAccessToken], ctrls.updateCategory)
router.delete("/:cid", [verifyAccessToken], ctrls.deleteCategory)


module.exports = router