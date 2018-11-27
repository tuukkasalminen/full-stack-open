const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    .populate('user', {id: 1, username: 1, name: 1})
        response.json(blogs.map(Blog.format))
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body
    try {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id) {
        return response.status(401).json({error: 'token puuttuu'})
    }

    if(body.likes === undefined) {
       body.likes = 0
    }
    if(body.title === undefined || body.url === undefined) {
        return response.status(400).end()
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })
    const postedBlog = await blog.save()
    user.blogs = user.blogs.concat(postedBlog._id)

    await user.save()
    response.json(Blog.format(postedBlog))
      }
      catch(exception) {
          if(exception.name === 'JsonWebTokenError') {
            response.status(401).json({error: exception.message})
          }
          else {
        response.status(500).json({error: 'jokin meni vikaan'})}
    }
    })

    blogsRouter.delete('/:id', async (request, response) => {
        try {
            const token = getTokenFrom(request)
            const decodedToken = jwt.verify(token, process.env.SECRET)

            if(!token || !decodedToken.id) {
                return response.status(401).json({error: 'token puuttuu'})
            }
            const blog = await Blog.findById(request.params.id)
            const user = await User.findById(decodedToken.id)

            if(blog.user.toString() === decodedToken.id || !blog.user) {
            await Blog.findByIdAndRemove(request.params.id)

            user.blogs = user.blogs.filter((blog) => blog.toString() !== request.params.id)
            await user.save()

            response.status(204).end()
            }
        }
            catch (exception) {
                console.log(exception)
                response.status(400).send({error: 'jokin meni vikaan'})
        }
    })

    blogsRouter.put('/:id', async (request, response) => {
        const body = request.body
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
            response.json(Blog.format(updatedBlog))
    })

module.exports = blogsRouter
  