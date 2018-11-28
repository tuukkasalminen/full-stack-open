import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
      this.setState({ blogs })
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
    await blogService.create(blog)
    this.setState({
      blogs: this.state.blogs.concat(blog),
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

  render() {
    const loginForm = () => (
      <div>
        <h2>kirjaudu</h2>
    
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleForms}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleForms}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )

    const blogForm = () => (
      <div>
        <h2>uusi blogi</h2>
        <form onSubmit={this.addBlog}>
          <div>
            otsikko
            <input 
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleForms}
            />
          </div>
          <div>
            tekijä
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleForms}
            />
          </div>
          <div>
            url
            <input 
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleForms}
            />
          </div>
          <button type="submit">tallenna</button>
        </form>
      </div>
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
          <Blog key={blog._id} blog={blog}/>
            )}
          </div>
        }
      </div>
    );
  }
}

export default App;
