const express = require('express')
const router = express.Router()
const auth = require('../../controllers/Auth')
const {
    validateConfirmPassword,
    validateName, validateEmail,
    validatePassword,
    validateLoginEmail,
    validateLoginPassword
} = require('../../models/User/validator')
const { verifyToken, verifyRefreshToken } = require('../../middlewares/Auth')

router.get('/', verifyToken, auth.get)

router.post('/login', [validateLoginEmail, validateLoginPassword], auth.login)
router.post('/register', [validateName, validateEmail, validatePassword, validateConfirmPassword], auth.register)
router.post('/refresh', verifyRefreshToken, auth.refresh)

module.exports = router