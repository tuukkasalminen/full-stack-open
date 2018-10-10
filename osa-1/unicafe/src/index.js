import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
constructor(props) {
    super(props)
    this.state = {
        hyva: 0,
        neutraali: 0,
        huono: 0,
        kaikki: 0
    }
}


asetaArvoon = (arvosana, arvo) => {
    return () => {
        this.setState({ [arvosana]: arvo, kaikki: this.state.kaikki + 1 })
    }
}

    render(){
        const ehto = () => {
            if(this.state.kaikki === 0 ) return (
                <p>ei palautetta</p>
            ) 
             return (
                <Statistics 
                hyva={this.state.hyva}
                neutraali={this.state.neutraali}
                huono={this.state.huono} 
                />
            )
        }
        return (
            <div>
                <h1>anna palautetta</h1>
                <Button 
                handleClick={this.asetaArvoon('hyva', this.state.hyva + 1)}
                text='Hyvä'
                />
                <Button 
                handleClick={this.asetaArvoon('neutraali', this.state.neutraali + 1)}
                text='Neutraali'
                />
                <Button 
                handleClick={this.asetaArvoon('huono', this.state.huono + 1)}
                text='Huono'
                />
                <h2>statistiikka</h2>
                {ehto()}
            </div>
        )
    }
}


const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistics = ({hyva, neutraali, huono}) => (
<table>
                <Statistic
                tilasto='Hyvä'
                arvo={hyva} 
                />
                <Statistic 
                tilasto='Neutraali'
                arvo={neutraali} 
                /> 
                <Statistic 
                tilasto='Huono'
                arvo={huono} 
                />
                <Statistic
                tilasto='Positiivisia'
                arvo={(hyva / (hyva + huono + neutraali)) * 100 + '%'}
                />
              <Statistic
                tilasto='Keskiarvo'
                arvo={hyva / (hyva + huono)}
                />
</table>
)

const Statistic = ({ tilasto, arvo }) => (
<tbody>
<tr>
        <td>{tilasto}</td>
        <td>{arvo}</td>
    </tr>
</tbody>
)


ReactDOM.render(<App />, document.getElementById('root'));
