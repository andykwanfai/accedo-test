import React, { Component } from "react"
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap'
import './MovieItem.css'

class MovieItem extends Component {

  render() {
    return (
      <Card className='movie_item'>
        <a href={`/detail/${this.props.data.id}`}>
          <CardImg src={this.props.data.logoSrc} />
          <CardBody>
            <CardTitle>{this.props.data.title}</CardTitle>
            <CardSubtitle>{this.props.data.type}</CardSubtitle>
          </CardBody>
        </a>
      </Card>
    )
  }
}
export default MovieItem
