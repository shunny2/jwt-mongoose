const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

const User = require('../models/User')

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    jest.clearAllMocks()
})

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
})

const check = jest.fn(async (user) => {
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) throw new Error('This user already exists!')
})

describe('Create User', () => {
    it('Should be able to create new user', async () => {
        const response = await request(app).post('/api/v1/auth/register').send({
            name: 'Alexander Davis',
            email: 'alexander.davis@gmail.com',
            password: '12345678',
            confirmPassword: '12345678'
        })

        expect(response.status).toBe(201)
        expect(response.body.user).toHaveProperty('_id')
    })

    it('Should not be able to create an existing user', async () => {

        const ExistingUser = {
            name: 'Existing User',
            email: 'existing.user@gmail.com',
            password: '12345678',
            confirmPassword: '12345678'
        }

        await request(app).post('/api/v1/auth/register').send(ExistingUser)

        const response = await request(app).post('/api/v1/auth/register').send(ExistingUser)

        expect(response.status).toBe(400)
        await expect(check(ExistingUser)).rejects.toEqual(new Error('This user already exists!'))
    })
})