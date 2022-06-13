const User = require("../../models/User")
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env

exports.get = (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' })
}

exports.login = async (req, res) => {
    const { email } = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(404).send({ error: errors })

    try {
        const existingUser = await User.findOne({ email: email }, '-password')
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email, name: existingUser.name },
            JWT_SECRET,
            { expiresIn: '20s' }
        )
        const refreshToken = jwt.sign({ token }, JWT_REFRESH_SECRET, { expiresIn: '1800s' })

        return res.status(200).json({ message: 'Successfully authenticated!', user: existingUser, token: token, refreshToken: refreshToken })
    } catch (error) {
        return res.status(500).json({ error: 'Could not enter. An internal server error has occurred.' })
    }
}

exports.register = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).send({ error: errors })

    try {
        await User.create(req.body)
        return res.status(200).json({ message: 'Successfully registered!' })
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' })
    }
}

exports.refresh = async (req, res) => {
    const { refreshToken } = req.body
    try {
        const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '1800s' })

        return res.status(200).json({ message: 'Token updated successfully!', token: token })
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' })
    }
}