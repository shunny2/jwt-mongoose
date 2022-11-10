const User = require("../../models/User")

exports.users = async (req, res) => {
    try {
        const users = await User.find()
        return res.status(200).json({ users: users })
    } catch (error) {
        return res.status(500).json({ message: 'Could not load the user list. An internal server error has occurred.' })
    }
}

exports.searchUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user)
            return res.status(404).json({ message: 'This user does not exist.' })

        return res.status(200).json({ user: user })
    } catch (error) {
        return res.status(500).json({ message: 'Error finding user. An internal server error has occurred.' })
    }
}
