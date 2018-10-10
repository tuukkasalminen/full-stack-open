import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
    const kurssi = {
     nimi: 'Half Stack -sovelluskehitys',
     osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14
        }
      ]
    }

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto osat={kurssi.osat} />
      <Yhteensa osat={kurssi.osat}  />
    </div>
  )
}

const Otsikko = (props) => {
    return (
    <div>
        <p>{props.kurssi}</p>
    </div>
    );
}

const Osa = (props) => {
    return (   
            <p>{props.osat.nimi} {props.osat.tehtavia}</p>
    );
}

const Sisalto = (props) => {
    return (
        <div>
            <Osa osat={props.osat[0]} />
            <Osa osat={props.osat[1]} />
            <Osa osat={props.osat[2]} />
        </div>
    );
}

const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.osat[0].tehtavia + props.osat[1].tehtavia + props.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)