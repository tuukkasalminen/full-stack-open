import React from 'react'
import {Link} from 'react-router-dom'

const Menu = () => (
    <div>    
      <Link to="/">anecdotes</Link>&nbsp;
      <Link to="/create">create new</Link>&nbsp;
      <Link to="/about">about</Link>&nbsp;
    </div>
  )

export default Menu