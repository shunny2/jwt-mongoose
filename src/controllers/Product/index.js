const Product = require('../../models/Product')

exports.get = (req, res) => {
    Product.find()
        .then(products => {
            res.json(products)
        })
        .catch(error => res.status(500).json(error))
}

exports.create = (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        price: req.body.price
    })

    newProduct
        .save()
        .then(() => {
            res.json('Registered successfully!!')
        })
        .catch(error => res.status(500).json(error))
}

exports.edit = (req, res) => {
    const newData = { name: req.body.name, price: req.body.price }

    Product.findOneAndUpdate({ _id: req.params.id }, newData, { new: true })
        .then(() => {
            res.json('Changed successfully!!')
        })
        .catch(error => res.status(500).json(error))
}

exports.delete = (req, res) => {
    Product.findOneAndDelete({ _id: req.params.id })
        .then(() => {
            res.json('Successfully deleted!!')
        })
        .catch(error => res.status(500).json(error))
}