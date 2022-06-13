const User = require("../../models/User")

exports.users = async (req, res) => {
    await User.find()
        .then(users => {
            res.json(users)
        })
        .catch(error => res.status(500).json(error))
}

exports.searchUserByEmail = async (req, res) => {
    await User.findOne({ email: req.params.email })
        .then(user => {
            res.json(user)
        })
        .catch(error => res.status(500).json(error))
}
