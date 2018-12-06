import React from 'react'

class Blog extends React.Component { 
constructor(props) {
  super(props)
  this.state = {
    expanded: false,
    blog: props.blog
  }
}

expand = () => {
  this.setState({expanded: !this.state.expanded})
}

  render(){
    const blog = this.state.blog

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

      if(this.state.expanded) {
        return (
          <div className="expanded" style={blogStyle} onClick={this.expand}>
            <p>{blog.title}</p>
            <p>added by {blog.author}</p>
            <p>{blog.likes} likes 
            <button onClick={this.props.likeBlog(blog)}>like</button></p>
            <p>{blog.url}</p>
            {(this.props.showDelete) && (<button onClick={this.props.deleteBlog(blog)}>delete blog</button>)}
          </div>
        )
      }

        return (
        <div className="content" style={blogStyle} onClick={this.expand}>
          <p>"{blog.title}" by {blog.author}</p>
        </div>  
)}}

export default Blog