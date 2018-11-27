import React from 'react';
import Filter from './components/Filter';
import Person from './components/AddPerson';
import service from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  componentDidMount() {
    service
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newNumber,
    }

    const double = this.state.persons.find(person => 
      person.name.toLowerCase() === this.state.newName.toLowerCase()
    )

    if(double) { 
      if(window.confirm('korvataanko vanha numero uudella'))
      service.update(double.id, nameObject)
      .then(response => {
        this.setState({
          persons: this.state.persons.map(person => person.id !== double.id ? person : response.data),
          newName: '',
          newNumber: '',
          notification: 'numero korvattu'
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000);
      })
      .catch(error => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== double.id),
          notification: `yhteystieto ${double.name} on jo poistunut`
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000);
      })
    }

    else {
      service.create(nameObject)
        .then(response => {
          this.setState({
            persons: this.state.persons.concat(response.data),
            newName: '',
            newNumber: '',
            notification: 'henkilö lisätty'
    })
    setTimeout(() => {
      this.setState({notification: null})
    }, 5000);
  })
  
  }
}

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }
  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }
  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }
 deletePerson = (id, name) => {
    if(window.confirm(`poistetaanko ${name}`))
    service.deleteName(id)
      .then(response => {
        this.setState({
          persons: this.state.persons.filter(n => n.id !== id),
          notification: 'henkilö poistettu'
        })
        setTimeout(() => {
          this.setState({notification: null})
        }, 5000);
      })
  }

  render() {
    const filteredNames = this.state.persons.filter(
      (person) => { 
        return person.name.toLowerCase().includes(this.state.filter)
      })
    
    return (
      <div>
        <Notification message={this.state.notification}/>
        <h2>Puhelinluettelo</h2>
        <Filter filter={this.state.filter}
        handleFilterChange={this.handleFilterChange}
        />
        <h3>lisää uusi</h3>
        <Person 
        addName={this.addPerson}
        newName={this.state.newName}
        handleNameChange={this.handleNameChange}
        newNumber={this.state.newNumber}
        handleNumberChange={this.handleNumberChange}
        />
        <h2>Numerot</h2>
        {filteredNames.map(person => <div key={person.id}>{person.name} {person.number}
        <button onClick={() => this.deletePerson(person.id, person.name)}>poista</button>
        </div>)}
      </div>
      
    )
  }
}

export default App
