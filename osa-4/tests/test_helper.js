const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
    title: "ok",
    author: "moi",
    url: "hei",
    likes: 0
    },
    {
    title: "moi",
    author: "moi",
    url: "heihei",
    likes: 0
    }
    ]

const format = (blog) => {
        return {
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes,
          id: blog._id
        }
      }

const nonExistingId = async () => {
    const blog = new Blog()
    await blog.save()
    await blog.remove()
    return blog._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users
  }

module.exports = {
    initialBlogs, nonExistingId, blogsInDb, format, usersInDb
}