const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const upload = require('../configs/cloudinary.config')

router.post('/', [verifyAccessToken], upload.fields([
    { name: "images", maxCount: 10 },
    { name: "thumb", maxCount: 1 }
]), ctrls.createProduct)
router.get('/', ctrls.getAllProduct)
router.put('/ratings', verifyAccessToken, ctrls.ratings)
router.get('/:pid', ctrls.getProduct)
router.put('/uploadimage/:pid', [verifyAccessToken], upload.array("images", 10), ctrls.uploadImagesProduct)
router.put('/:pid', [verifyAccessToken], ctrls.updateProduct)
router.delete('/:pid', [verifyAccessToken], ctrls.deleteProduct)


module.exports = router