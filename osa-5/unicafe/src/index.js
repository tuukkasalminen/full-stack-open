import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
  const palaute = store.getState()
  const palautteet = (palaute) => palaute.good + palaute.ok + palaute.bad

  if (palautteet(palaute) === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palaute.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palaute.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palaute.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td></td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <button>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    store.dispatch({type: nappi})
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka />
      </div>
    )
  }
}

const render = () => {
    ReactDOM.render(<App />, document.getElementById('root'))
  }
  
  render()
  store.subscribe(render)