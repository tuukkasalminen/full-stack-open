const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
        .populate('blogs', {id: 1, title: 1, author: 1, url: 1, likes: 1})
    response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if(body.adult === undefined) {
            body.adult = true
        }
        const existing = await User.find({username: body.username})
        if(existing.length>0) {
            return response.status(400).json({error: 'username not unique'})
        }
        if(body.password.length<3) {
            return response.status(400).json({error: 'password too short'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            adult: body.adult,
            passwordHash
        })

        const savedUser = await user.save()
        response.json(User.format(savedUser))
    } catch (exception) {
        console.log(exception) 
        response.status(500).json({error: 'jokin meni vikaan'})
    }
})

module.exports = usersRouter