import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from'./Blog'

describe('<Blog />', () => {
    const blog = {
        title: 'otsikko',
        author: 'tekijä',
        likes: 0,
        url: 'url'
    }
    it('renders only title and author', () => {
        const blogComponent = shallow(<Blog blog={blog} />)
        const contentDiv = blogComponent.find('.content')
        console.log(contentDiv.debug())

        expect(contentDiv.text()).toContain(blog.title, blog.author)
        expect(contentDiv.text()).not.toContain(blog.likes, blog.url)
    })
    it('displays all details after click', () => {
        const mockHandler = jest.fn()

        const blogComponent = shallow(<Blog blog={blog} likeBlog={mockHandler} deleteBlog={mockHandler} />)
        const nameDiv = blogComponent.find('.content')
        nameDiv.simulate('click')

        const contentDiv = blogComponent.find('.expanded')
        expect(contentDiv.text()).toContain(blog.title, blog.author, blog.likes, blog.url)
    })
})