const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { format, initialBlogs, nonExistingId, blogsInDb } = require('./test_helper')


describe('if any blogs are saved', async () => {
beforeAll(async () => {
    await Blog.remove({})

    let blogObjects = initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('returns all blogs', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedBlogs = response.body.map(blog => blog.title)
    blogsInDatabase.forEach(blog => {
        expect(returnedBlogs).toContain(blog.title)
    })
})

describe('post requests', () => {
test('posts new blog', async () => {
    const blogsStart = await blogsInDb()

    const newBlog = {
        title: "testi",
        author: "testaaja",
        url: "hei",
        likes: 0
    }
    await api.post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
    const blogsAfter = await blogsInDb()

    expect(blogsAfter.length).toBe(blogsStart.length + 1)
    const blogs = blogsAfter.map(blog => blog.title)
    expect(blogs).toContain('testi')
})

test('empty likes = 0', async () => {
    const newBlog = {
        title: "testi",
        author: "testaaja",
        url: "hei"
    }
    const response = await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blog = response.body
    expect(blog.likes).toBe(0)
})

test('empty url or title', async () => {
    const newBlog = {
        author: "testaaja",
        likes: 0
    }
    await api.post('/api/blogs')
    .send(newBlog)
    .expect(400)
})
})

afterAll(() => {
    server.close()
  })
})