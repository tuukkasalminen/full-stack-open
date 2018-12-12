import React from 'react'
import {vote} from './../reducers/anecdoteReducer'
import {timeOutNotificiation } from '../reducers/notificationReducer';
import Filter from './Filter'
import {connect} from 'react-redux'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <Filter />
        <h2>Anecdotes</h2>
        {this.props.visibleAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={async () => {
                const voted = {...anecdote, votes: anecdote.votes+1}
                await anecdoteService.voteAnecdote(voted)
                this.props.vote(anecdote.id)
                this.props.timeOutNotificiation(anecdote.content, 5)}
              }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const filtered = (anecdotes, filter) => anecdotes.filter(anecdote => 
  anecdote.content.toLowerCase().includes(filter))

const mapStateToProps = (state) => {
  return { 
    visibleAnecdotes: filtered(state.anecdotes, state.filter)
  }
}

export default connect(mapStateToProps, {vote, timeOutNotificiation})(AnecdoteList)
