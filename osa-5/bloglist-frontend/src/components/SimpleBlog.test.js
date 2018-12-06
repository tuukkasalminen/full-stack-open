import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
const blog = {
    title: 'otsikko',
    author: 'tekijä',
    likes: 0
    }

  it('renders title, author and likes', () => {
    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')
    console.log(contentDiv.debug())

    expect(contentDiv.text()).toContain(blog.title, blog.author)

    const likesDiv = blogComponent.find('.likes')
    console.log(likesDiv.debug())
    expect(likesDiv.text()).toContain(blog.likes)
  })
  
  it('if button is clicked twice, eventhandler is called twice', () => {
      const mockHandler = jest.fn()

      const blogComponent = shallow(<SimpleBlog 
        blog={blog}
        onClick={mockHandler} />)

        const button = blogComponent.find('button')
        button.simulate('click')
        button.simulate('click')
        
        expect(mockHandler.mock.calls.length).toBe(2)
  })
})