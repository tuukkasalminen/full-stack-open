import React from 'react'
import PropTypes from 'prop-types'

const blogForm = ({addBlog, handleForms, author, title, url}) => (
    <div>
      <h2>uusi blogi</h2>
      <form onSubmit={addBlog}>
        <div>
          otsikko
          <input 
            type="text"
            name="title"
            value={title}
            onChange={handleForms}
          />
        </div>
        <div>
          tekijä
          <input
            type="text"
            name="author"
            value={author}
            onChange={handleForms}
          />
        </div>
        <div>
          url
          <input 
            type="text"
            name="url"
            value={url}
            onChange={handleForms}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )

  blogForm.propTypes = {
    handleForms: PropTypes.func.isRequired,
    addBlog: PropTypes.func.isRequired,
    author: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }

  export default blogForm