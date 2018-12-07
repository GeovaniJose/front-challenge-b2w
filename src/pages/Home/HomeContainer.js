import React, { Component } from 'react'
import NProgress from 'nprogress'

import api from '../../services/api'

import Home from './Home'

export default class HomeContainer extends Component {
  state = {
    planets: [],
    planet: {},
    page: 1
  }

  componentDidMount () {
    this.chargePage()
  }

  chargePage = () => {
    NProgress.start()
    this.randomPage()
  }

  randomPage = async () => {
    try {
      const response = await api.get('/planets')

      const pages = response.data.pages
      const page = Math.floor(Math.random() * (pages - 1 + 1) + 1)

      this.setState({ page })

      this.loadPlanets()
    } catch (err) {
      console.log('Erro:', err)

      document.querySelector('#nprogress .bar').style.backgroundColor = '#f00'
      NProgress.done()
    }
  }

  loadPlanets = async () => {
    try {
      const response = await api.get(`/planets?page=${this.state.page}`)

      this.setState({ planets: response.data.docs })

      document.querySelector('#nprogress .bar').style.backgroundColor = '#fff'
      NProgress.done()

      this.randomPlanet()
    } catch (err) {
      console.log('Erro:', err)

      document.querySelector('#nprogress .bar').style.backgroundColor = '#f00'
      NProgress.done()
    }
  }

  randomPlanet = () => {
    const random = Math.floor(Math.random() * this.state.planets.length)
    this.setState({ planet: this.state.planets[random] })
  }

  render () {
    return (
      <Home planet={this.state.planet} nextPlanet={this.chargePage} />
    )
  }
}
