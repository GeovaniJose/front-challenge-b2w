import React, { Component } from 'react'
import NProgress from 'nprogress'

import api from '../../services/api'

import Home from './Home'

export default class HomeContainer extends Component {
  state = {
    planets: []
  }

  componentDidMount () {
    NProgress.start()
    this.loadPlanets()
  }

  loadPlanets = async () => {
    try {
      const response = await api.get('/planets/5c09df546cc1092444f7a035')

      // this.setState({ planets: response.data.docs })
      this.setState({ planets: response.data })

      console.log('response', this.state.planets)

      document.querySelector('#nprogress .bar').style.backgroundColor = '#007fff'
      NProgress.done()
    } catch (err) {
      console.log('Erro:', err)

      document.querySelector('#nprogress .bar').style.backgroundColor = '#f00'
      NProgress.done()
    }
  }

  render () {
    return (
      <Home planets={this.state.planets} />
    )
  }
}
