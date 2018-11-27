import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filter: '',
      countries: []
    }

  }

  componentDidMount(){
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        console.log(response.data)
        this.setState({countries: response.data})
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }


  render() {
    const filteredCountries = this.state.countries.filter(country => {
      if(this.state.filter === '') {return null}
      else {
      return country.name.toLowerCase().indexOf(this.state.filter) !== -1
      }
    })
    console.log(filteredCountries)


    const filteredCountries2 = () => {
    if(filteredCountries.length > 10) {
    return <div>too many matches</div>} 

    else if(filteredCountries.length === 1) {
      return (
        <div>
        <h1>{filteredCountries[0].name}</h1>
        <div>capital: {filteredCountries[0].capital}</div>
        <div>population: {filteredCountries[0].population}</div>
        <div>flag: <img width="200px" src={filteredCountries[0].flag} alt="flag" /></div>
        </div>
      )
    }

    else { 
      return filteredCountries.map(country => {
        return (
      <div key={country.alpha3Code}>
      {country.name}
      </div>
      )
    })
    }
    }

    return (
      <div>
        find countries <input 
        value={this.state.filter}
        onChange={this.handleFilterChange}
        />
        {filteredCountries2()}
      </div>
    );
  }
}

export default App;
