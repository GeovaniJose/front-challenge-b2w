import React from 'react'

import './styles.css'

const Home = ({ planet }) => (
  <div className='container'>
    <div className='box'>
      <h3>{planet ? planet.name : 'Error'}</h3>
      <div className='content'>
        <p>Population: {planet ? planet.population : 'nobody'}</p>
        <p>Climate: {planet ? planet.climate : 'bad'}</p>
        <p>Terrain: {planet ? planet.terrain : 'poor'}</p>
      </div>
      <p>Featured in {planet ? planet.films : '0'} films</p>
    </div>
    <button className='next' >NEXT</button>
  </div>
)

export default Home
