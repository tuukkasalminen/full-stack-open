import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app
    describe('when user is not logged', () => {
      beforeEach(() => {
        app = mount(<App />)
      })
  
      it('only login form is rendered', () => {
        app.update()

        const loginForm = app.find(LoginForm)
        const blogForm = app.find(BlogForm)
        const blogs = app.find(Blog)

        expect(loginForm.length).toBe(1)
        expect(blogForm.length).toBe(0)
        expect(blogs.length).toBe(0)
      })
    })
  
    describe('when user is logged', () => {
    const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
        }
      beforeEach(() => {
        localStorage.setItem('loggedUser', JSON.stringify(user))
        app = mount(<App />)
      })
  
      it('all notes are rendered', () => {
        app.update()
        
        const loginForm = app.find(LoginForm)
        console.log(loginForm.debug())
        const blogForm = app.find(BlogForm)
        const blogs = app.find(Blog)

        expect(loginForm.length).toBe(0)
        expect(blogForm.length).toBe(1)
        expect(blogs.length).toBe(blogService.blogs.length)
      })
    })
  })