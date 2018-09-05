import React, { Component } from "react"
import { Row, Col, Container } from 'reactstrap'
import axios from "axios"
import { Redirect } from "react-router-dom";
import MovieItem from './MovieItem'
import './Movies.css'

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: -1,
      itemPerRow: this.getItemPerRow(window.innerWidth)
    }

  }

  componentDidMount() {
    //listen the change of browser size
    window.addEventListener("resize", () => {
      this.setState({ itemPerRow: this.getItemPerRow(window.innerWidth) })
    });

    //listen key press
    document.addEventListener("keypress", this.handleKeypress)

    //get all data
    axios({
      method: 'GET',
      url: '/api/movie',
      headers: { 'X-SimpleOvpApi': sessionStorage.getItem('user_key') }
    }).then(response => {
      this.setState({ items: response.data.items })
    })
  }

  //get the number of items per row
  getItemPerRow = window_width => {
    const xl = 1200,
      lg = 992,
      md = 768,
      sm = 576

    //let itemPerRow

    if (window_width >= xl) {
      return 6
    }
    else if (window_width >= lg) {
      return 4
    }
    else if (window_width >= md) {
      return 3
    }
    else if (window_width >= sm) {
      return 2
    }
    else {
      return 1
    }

  }

  handleKeypress = e => {

    let selectedItem = this.state.selectedItem
    let itemPerRow = this.state.itemPerRow
    if (selectedItem == -1) {
      selectedItem == 0
    }
    else {
      switch (e.key) {
      case 'ArrowUp':
        selectedItem -= itemPerRow
        break
      case 'ArrowDown':
        selectedItem += itemPerRow
        break
      case 'ArrowLeft':
        selectedItem--
        break
      case 'ArrowRight':
        selectedItem++
        break
      default:
      }
    }
    if (selectedItem >= 0 && selectedItem < this.state.items.length) {
      document.getElementsByClassName("movie_item")[selectedItem].getElementsByTagName("A")[0].focus();
      this.setState({ selectedItem: selectedItem })
    }
  }

  render() {
    if (!sessionStorage.getItem('user_key')) {
      return <Redirect from="/" to="/login" />
    }

    else if (!this.state.items) {
      return <div>Loading</div>
    }
    else {
      return (
        <Container fluid>
          <h1>Movies</h1>
          <hr />
          <Row >
            {this.state.items.map(data => {
              return (
                <Col xl='2' lg='3' md='4' sm='6' xs='12' key={data.id}>
                  <MovieItem tabIndex={data.id} data={data} />
                </Col>
              )
            })}
          </Row>
        </Container>
      )
    }
  }

}

export default Movies
