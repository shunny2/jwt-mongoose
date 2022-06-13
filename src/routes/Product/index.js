const express = require('express')
const router = express.Router()
const product = require('../../controllers/Product')

router.get('/', product.get)

router.post('/create', product.create)

router.put('/edit/:id', product.edit)

router.delete('/delete/:id', product.delete);

module.exports = router