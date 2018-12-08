import React, { Component } from 'react'
import NProgress from 'nprogress'

import api from '../../services/api'

import Home from './Home'

const bgSlider = [
  [
    '1.jpg) no-repeat center',
    '2.jpg) no-repeat center',
    '3.jpg) no-repeat bottom',
    '4.jpg) no-repeat center'
  ],
  [
    '3.jpg) no-repeat bottom',
    '4.jpg) no-repeat center',
    '5.jpg) no-repeat left'
  ],
  [
    '2.jpg) no-repeat center',
    '3.jpg) no-repeat bottom',
    '6.jpg) no-repeat center'
  ],
  [
    '2.jpg) no-repeat center',
    '3.jpg) no-repeat bottom',
    '6.jpg) no-repeat center'
  ],
  [
    '2.jpg) no-repeat center',
    '4.jpg) no-repeat center',
    '5.jpg) no-repeat left',
    '6.jpg) no-repeat center'
  ],
  [
    '1.jpg) no-repeat center',
    '2.jpg) no-repeat center',
    '4.jpg) no-repeat center'
  ]
]

export default class HomeContainer extends Component {
  state = {
    planets: [],
    planet: {},
    page: 1
  }

  componentDidMount () {
    this.randomBgSlider()
    NProgress.start()
    this.randomPage()

    document.querySelector('.next').addEventListener('click', this.randomBgSlider)
    document.querySelector('.next').addEventListener('click', NProgress.start)
    document.querySelector('.next').addEventListener('click', this.randomPage)
  }

  randomBgSlider = () => {
    const home = Math.floor(Math.random() * bgSlider.length)

    const box = Math.floor(Math.random() * bgSlider[home].length)

    document.querySelector('.container').setAttribute('style', `background: url(../../assets/background-home-0${home + 1}.jpg) no-repeat center top fixed / 100% 100%`)

    document.querySelector('.box').setAttribute('style', `background: url(../../assets/background-box-0${bgSlider[home][box]} / cover`)
  }

  errorAlert = (err) => {
    this.setState({ planet: false })

    console.log('planet', this.state.planet)
    console.log('Erro:', err)

    document.querySelector('#nprogress .bar').style.backgroundColor = '#f00'
    NProgress.done()
  }

  randomPage = async () => {
    try {
      const response = await api.get('/planets')

      const pages = response.data.pages
      const page = Math.floor(Math.random() * (pages - 1 + 1) + 1)

      this.setState({ page })

      this.loadPlanets()
    } catch (err) {
      this.errorAlert(err)
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
      this.errorAlert(err)
    }
  }

  randomPlanet = () => {
    const random = Math.floor(Math.random() * this.state.planets.length)
    this.setState({ planet: this.state.planets[random] })
  }

  render () {
    return (
      <Home planet={this.state.planet} />
    )
  }
}
