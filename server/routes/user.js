const router = require('express').Router()
const ctrls = require('../controllers/user')
const { verifyAccessToken } = require('../middlewares/verifyToken')

router.post('/', ctrls.Register)
router.post('/login', ctrls.login)
router.post('/refreshtoken', ctrls.refreshAccessToken)
router.post('/logout', ctrls.logout)
router.get('/forgotpassword', ctrls.forgotPassword)
router.put('/resetpassword', ctrls.resetPassword)
router.get('/', ctrls.getUsers)
router.delete('/:uid', [verifyAccessToken], ctrls.deleteUser)
router.put('/:uid', [verifyAccessToken], ctrls.updateUser)


// POST + PUT - gửi theo kiểu body
// GET + DELETE - gửi theo kiểu query

module.exports = router