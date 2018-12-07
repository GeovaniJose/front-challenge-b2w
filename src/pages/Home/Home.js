import React from 'react'

import './styles.css'

const Home = ({ planet, nextPlanet }) => (
  <div className='container'>
    <div className='box'>
      <h3>{planet.name}</h3>
      <div className='content'>
        <p>Population: {planet.population}</p>
        <p>Climate: {planet.climate}</p>
        <p>Terrain: {planet.terrain}</p>
      </div>
      <p>Featured in {planet.films} films</p>
    </div>
    <button className='next' onClick={nextPlanet}>NEXT</button>
  </div>
)

export default Home
