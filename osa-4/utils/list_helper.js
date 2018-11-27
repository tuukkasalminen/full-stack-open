const dummy = (blogs) => {
    return 1
  }
  
const totalLikes = (blogs) => {
    if(blogs.length === 0) {return 0}
    if(blogs.length === 1) {
        return blogs[0].likes
    } else {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)}
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {return empty}
    if(blogs.length === 1) {return blogs[0]} else {
        const mostLiked = Math.max.apply(Math, blogs.map(blog => {
            return blog.likes}))
        return blogs.find(blog => blog.likes === mostLiked)
}
}

const empty = {error: 'list is empty'}
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }