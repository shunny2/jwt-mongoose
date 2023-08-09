const mongoose = require('mongoose')
const request = require('supertest')
const app = require('../app')

const User = require('../models/User')

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    jest.clearAllMocks()
})

/* Dropping the database and closing the connection after all tests. */
afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
})

const check = jest.fn(async (user) => {
    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) throw new Error('This user already exists!')
    if (!existingUser) throw new Error('This user does not exist.')
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

describe('List Users', () => {
    it('Should be able to return all users', async () => {
        const response = await request(app).get('/api/v1/users')

        expect(response.status).toBe(200)
        expect(response.body.users.length).toBeGreaterThan(0)
    })

    it('Should be able to return a user by email', async () => {
        const response = await request(app).get('/api/v1/users/alexander.davis@gmail.com')

        expect(response.status).toBe(200)
        expect(response.body.user.name).toBe('Alexander Davis')
    })

    it('Should not be able to find a user that doesn\u0027t exist', async () => {
        const UserDoesNotExist = {
            email: 'user.does.not.exist@gmail.com'
        }

        const response = await request(app).get(`/api/v1/users/${UserDoesNotExist.email}`)

        expect(response.status).toBe(404)
        await expect(check(UserDoesNotExist)).rejects.toEqual(new Error('This user does not exist.'))
    })
})

describe('User Authentication Steps', () => {
    let token = ''
    let refreshToken = ''

    beforeAll(async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'alexander.davis@gmail.com',
            password: '12345678'
        })

        /* Getting the authentication token. */
        token = response.body.token
        refreshToken = response.body.refreshToken
    })

    it('Should be able to log in', async () => {
        const response = await request(app).post('/api/v1/auth/login').send({
            email: 'alexander.davis@gmail.com',
            password: '12345678'
        })

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Successfully authenticated!')
        expect(response.body).toHaveProperty('token')
        expect(response.body).toHaveProperty('refreshToken')
    })

    it('Should not be able to log in', async () => {
        const User = {
            email: 'alexander.davis2@gmail.com',
            password: '12345678'
        }

        const response = await request(app).post('/api/v1/auth/login').send(User)

        expect(response.status).toBe(404)
        await expect(check(User)).rejects.toEqual(new Error('This user does not exist.'))
    })

    it('Should be able to perform user authentication', async () => {
        const response = await request(app).get('/api/v1/auth').set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Welcome to the API')
    })

    it('Should not be able to perform user authentication', async () => {
        const response = await request(app).get('/api/v1/auth').set('Authorization', 'Bearer sajd348@#435901X|ZSAS1')

        expect(response.status).toBe(403)
    })

    it('Should be able to generate a new access token', async () => {
        const response = await request(app).post('/api/v1/auth/refresh').set('Accept', 'application/json').send({
            refreshToken: refreshToken
        })

        expect(response.status).toBe(200)
        expect(response.body.message).toBe('Token updated successfully!')
        expect(response.body).toHaveProperty('token')
    })

    it('Should not be able to generate a new access token', async () => {
        const response = await request(app).post('/api/v1/auth/refresh').set('Accept', 'application/json').send({
            refreshToken: 'sajd348@#435901X|ZSAS1'
        })

        expect(response.status).toBe(403)
    })
})