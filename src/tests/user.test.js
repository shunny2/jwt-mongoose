const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
})

/* Dropping the database and closing connection after each test. */
afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
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
        await request(app).post('/api/v1/auth/register').send({
            name: 'Existing User',
            email: 'existing.user@gmail.com',
            password: '12345678',
            confirmPassword: '12345678'
        })

        const response = await request(app).post('/api/v1/auth/register').send({
            name: 'Existing User',
            email: 'existing.user@gmail.com',
            password: '12345678',
            confirmPassword: '12345678'
        })

        expect(response.status).toBe(400)
    })
})