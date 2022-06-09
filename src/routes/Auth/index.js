const express = require('express')
const { validationResult } = require('express-validator')
const User = require('../../models/User');
const { validateConfirmPassword, validateName, validateEmail, validatePassword, validateLogin, validateLoginEmail, validateLoginPassword } = require('./validator')
const router = express.Router()
const jwt = require('jsonwebtoken')
const { verifyToken, verifyRefreshToken } = require('../../middlewares/Auth')

const { JWT_SECRET, JWT_REFRESH_SECRET } = process.env;

router.get('/auth', verifyToken,  (req, res) => {
    res.status(200).json({ message: 'Welcome to the API' })
});

router.get('/auth/users', async (req, res) => {
    await User.find()
        .then(users => {
            res.json(users);
        })
        .catch(error => res.status(500).json(error));
});

router.get('/auth/user/:email', async (req, res) => {
    await User.findOne({ email: req.params.email })
        .then(user => {
            res.json(user);
        })
        .catch(error => res.status(500).json(error));
});


router.post('/auth/login', [validateLoginEmail, validateLoginPassword], async (req, res) => {
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

        return res.status(200).json({ message: 'Successfully authenticated!', user: existingUser, token: token, refreshToken: refreshToken });
    } catch (error) {
        return res.status(500).json({ error: 'Could not enter. An internal server error has occurred.' });
    }
});

router.post('/auth/register', [validateName, validateEmail, validatePassword, validateConfirmPassword], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return res.status(400).send({ error: errors })

    try {
        await User.create(req.body);
        return res.status(200).json({ message: 'Successfully registered!' });
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' });
    }
});

router.post('/auth/refresh', verifyRefreshToken, async (req, res) => {
    const { refreshToken } = req.body
    try {
        const token = jwt.sign({ refreshToken }, JWT_SECRET, { expiresIn: '1800s' })

        return res.status(200).json({ message: 'Token updated successfully!', token: token });
    } catch (error) {
        return res.status(500).json({ error: 'Unable to register. There was an internal server error.' });
    }
});

module.exports = router;