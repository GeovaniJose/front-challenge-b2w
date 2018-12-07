import React from 'react'
// import { Link } from 'react-router-dom'

import './styles.css'

const Home = ({ planets }) => (
  <div className='container'>
    <div className='box'>
      <h3>{planets.name}</h3>
      <div className='content'>
        <p>Population: {planets.population}</p>
        <p>Climate: {planets.climate}</p>
        <p>Terrain: {planets.terrain}</p>
      </div>
      <p>Featured in {planets.films} films</p>
    </div>
    <button className='next'>NEXT</button>
  </div>
)

export default Home
