import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (store = [], action) => {
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {

    return [...store, action.data]
  }
  if (action.type === 'INIT') {
    return action.data
  }

  return store
}

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const created = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: created
    })
  }
}

export const vote = (id) => {
  return {
    type: 'VOTE',
    id
  }
}

export const anecdoteInit = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT', data: anecdotes
    })
  }
}

export default anecdoteReducer