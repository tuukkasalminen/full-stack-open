import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      error: null,
      notification: null,
      user: null,
      title: '',
      author: '',
      url: ''
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs: this.sortBlogs(blogs) })
    )
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({user: user})
      blogService.setToken(user.token)
    }
  } 

  addBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    try {
    const newBlog = await blogService.create(blog)
      this.setState({
        blogs: this.state.blogs.concat(newBlog),
        title: '',
        author: '',
        url: '',
        notification: `uusi blogi "${this.state.title}" tekijältä ${this.state.author} lisättiin`
    })
      setTimeout(() => {
        this.setState({ notification: null })
    }, 5000)
    } catch (exception) {
      this.setState({error: 'blogin lisääminen epäonnistui'})
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
  
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user})
    } catch(exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  handleForms = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogOut = () => {
    window.localStorage.removeItem('loggedUser')
    this.setState({user: null, notification: 'kirjauduttiin ulos'})
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
  }

  sortBlogs = (blogs) => {
    const sorted = blogs.sort((a, b) => b.likes - a.likes)
    return sorted
  }

  likeBlog = (blog) => {
    return async () => {
      try {
        const updatedBlog = blog
        updatedBlog.likes += 1
        await blogService.like(updatedBlog)
        this.setState({blogs: blog()})
      } catch(exception) {
        console.log(exception)
      }
    }
  }

  deleteBlog = (blog) => {
    return async () => {
      try {
        if(window.confirm ('delete this blog?')){
        await blogService.remove(blog)
        const blogs = this.state.blogs.filter((b) => b._id !== blog._id)
        this.setState({blogs})
    }
   } catch (exception) {
      console.log(exception)
  }
}}

  render() {
    const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm 
        username={this.state.username}
        password={this.state.password}
        handleForms={this.handleForms}
        handleSubmit={this.login}
      />
    </Togglable>
    )

    const blogForm = () => (
      <Togglable buttonLabel="new blog">
        <BlogForm 
        title={this.state.title}
        author={this.state.author}
        url={this.state.url}
        handleForms={this.handleForms}
        addBlog={this.addBlog}
        />
      </Togglable>
    )

    return (
      <div>
        <Notification message={this.state.error}/>
        <Notification message={this.state.notification} />
        <h2>blogs</h2>
        
        {this.state.user === null ?
          loginForm() : 
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.handleLogOut}>log out</button>
            {blogForm()}
        {this.state.blogs.map(blog => 
          <Blog 
          key={blog._id} 
          blog={blog} 
          deleteBlog={this.deleteBlog}
          likeBlog={this.likeBlog}
          showDelete={!blog.user || blog.user.username === this.state.user.username}
          />
          )}
          </div>
        }
      </div>
    );
  }
}

export default App;
