const { check } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    validateName: check('name')
        .notEmpty()
        .withMessage('Name is required.')
        .isLength({ min: 4, max: 16 })
        .withMessage('Name must be between 4 to 30 characters.'),

    validateEmail: check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .isEmail()
        .withMessage('Invalid email type.')
        .bail()
        .custom(async (email) => {
            const existingUser = await User.findOne({ email: email })
            if (existingUser)
                throw new Error('Email already in use.')
        }),

    validatePassword: check('password')
        .notEmpty()
        .withMessage('Password is required.')
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters.'),

    validateConfirmPassword: check('confirmPassword')
        .notEmpty()
        .withMessage('Confirm password is required.')
        .trim()
        .isLength({ min: 4, max: 16 })
        .withMessage('Password must be between 4 to 16 characters.')
        .bail()
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password

            if (password !== confirmPassword)
                throw new Error('Passwords must be same.')
        }),

    validateLoginEmail: check('email')
        .notEmpty()
        .withMessage('Email is required.')
        .bail()
        .custom(async (email, { req }) => {
            const existingUser = await User.findOne({ email: email })
            const password = req.body.password
            if (!existingUser)
                throw new Error('This user does not exist.')

            const checkPassword = await bcrypt.compare(password, existingUser.password)
            if (!checkPassword)
                throw new Error('This user does not exist.')
        }),

    validateLoginPassword: check('password')
        .notEmpty()
        .withMessage('Password is required.')
}