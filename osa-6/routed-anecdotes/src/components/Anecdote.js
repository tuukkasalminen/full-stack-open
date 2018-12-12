import React from 'react'

const Anecdote = ({anecdote}) => {
    return (
        <div>
            <p>"{anecdote.content}"" has {anecdote.votes} votes</p>
            <p>for more info, see {anecdote.url}</p>
        </div>
    )
}

export default Anecdote