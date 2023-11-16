const router = require('express').Router()
const ctrls = require('../controllers/product')
const { verifyAccessToken } = require('../middlewares/verifyToken')
const upload = require('../configs/cloudinary.config')

router.post('/', [verifyAccessToken], ctrls.createProduct)
router.get('/', ctrls.getAllProduct)
router.put('/ratings', ctrls.ratings)
router.post('/uploadimage', upload.fields([{ name: "images", maxCount: 10 }]), ctrls.uploadImagesProduct)

router.put('/:pid', [verifyAccessToken], ctrls.updateProduct)

router.delete('/:pid', [verifyAccessToken], ctrls.deleteProduct)


module.exports = router