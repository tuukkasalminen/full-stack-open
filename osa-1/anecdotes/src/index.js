import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 0,
        pisteet: [0, 0, 0, 0, 0, 0],
    }
  }

  render() {
    const kopio = this.state.pisteet;

    const suurinPistemaara = () => Math.max(...kopio);
    const suurinIndex = () => kopio.findIndex((index) => index === suurinPistemaara())

    return (
      <div>
          <button onClick={() => {kopio[this.state.selected] += 1
          this.setState({ pisteet: kopio })}}>vote</button>
          <button onClick={() => this.setState({ selected: Math.floor(Math.random()* 6) })}>next anecdote</button>
        <p>{this.props.anecdotes[this.state.selected]}</p>
        <p>{this.state.pisteet[this.state.selected]}</p>
        <h1>anecdote with most votes</h1>
        <p>{this.props.anecdotes[suurinIndex(this.state.pisteet)]}</p>
        <p>{suurinPistemaara()} votes</p>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)