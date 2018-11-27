import React from 'react';

const Kurssi = ({ kurssit }) => {
  return (
    <div>
      <Otsikko nimi={kurssit.nimi} />
      <Sisalto osat={kurssit.osat} />
      <Tehtavia osat={kurssit.osat} />
    </div>
  )
}

const Otsikko = ({ nimi }) => {
  return (
  <h1>{nimi}</h1>
  );
}

const Sisalto = ({ osat }) => {
  return (
  osat.map(osa => <Osa key={osa.id} osa={osa} />)
  );
}

const Osa = ({ osa }) => {
  return (
  <div>{osa.nimi} {osa.tehtavia}</div>
  );
}

const Tehtavia = ({ osat }) => {
  const yhteensa = osat.reduce((a, b) => {
    return a + b.tehtavia;
  }, 0)
  return (
   <div>yhteensä {yhteensa} tehtävää</div>
  )
}

const Kurssit = ({ kurssit }) => {
  return (
  kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssit={kurssi} />)
  );
}

export default Kurssit;