import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({handleSubmit, handleForms, username, password}) => {
return (
    <div>
      <h2>kirjaudu</h2>
  
      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleForms}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleForms}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>)
  }
  
  LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleForms: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }

  export default LoginForm