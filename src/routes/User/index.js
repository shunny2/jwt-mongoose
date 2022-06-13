const express = require('express')
const router = express.Router()
const user = require('../../controllers/User')

router.get('/', user.users)
router.get('/:email', user.searchUserByEmail)

module.exports = router