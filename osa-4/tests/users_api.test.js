const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const { format, initialNotes, nonExistingId, notesInDb, usersInDb } = require('./test_helper')

describe('any users in db', async () => {
    beforeAll(async () => {
        await User.remove({})
        const user = new User({username: 'matti', password: '12345'})
        await user.save()
    })
    test('add new user', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'petri',
            name: 'petri saaristo',
            adult: true,
            password: 'jotain'
        }

        await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length+1)
        const usernames = usersAfter.map(name => name.username)
        expect(usernames).toContain(newUser.username)
        })

    test('unique usename', async () => {
            const usersBefore = await usersInDb()

            const newUser = {
                username: 'matti',
                name: 'matti meikalainen',
                adult: true,
                password: 'jotain'
            }
            const response = await api.post('/api/users')
                .send(newUser)
                .expect(400)
                
            expect(response.body).toEqual({error: 'username not unique'})
            const usersAfter = await usersInDb()
            expect(usersAfter.length).toBe(usersBefore.length)
        })
    
    test('adult default is true', async () => {
        const newUser = {
            username: 'juha',
            name: 'juha kivi',
            password: 'jotain'
        }
        const response = await api.post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        expect(response.body.adult).toBe(true)
    })

    test('password must be over 3 characters', async () => {
        const usersBefore = await usersInDb()

        const newUser = {
            username: 'juhakivi',
            name: 'juha kivi',
            password: 'ab'
        }
        const response = await api.post('/api/users')
        .send(newUser)
        .expect(400)

        expect(response.body).toEqual({error: 'password too short'})
        const usersAfter = await usersInDb()
        expect(usersAfter.length).toBe(usersBefore.length)
    }) 
})

afterAll(() => {
    server.close()
  })