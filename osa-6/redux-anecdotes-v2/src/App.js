import React from 'react'
import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import { connect } from 'react-redux'
import { anecdoteInit } from './reducers/anecdoteReducer'
//6.12 tehty
class App extends React.Component {
  componentDidMount = async () => {
    this.props.anecdoteInit()
  }
  render() {
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm  />
      </div>
    )
  }
}

export default connect(null, {anecdoteInit})(App)