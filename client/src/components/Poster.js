import React from "react";
import {Carousel} from "react-bootstrap";
import {connect} from "react-redux";

class Poster extends React.Component {
  constructor(){
    super();
    this.state = {
      hasCast: false
    }
  }

  render() {

    const actualPosters = Object.keys(this.props.cast).length > 0 || this.props.cast.length > 0 ?
      this.props.cast.filter(movie => {
        return movie.poster_path
      }) : {}
    const posters = Object.keys(actualPosters).length > 0 ?
      actualPosters.map((movie, i) => {
        return (
          <Carousel.Item key={i}>
            <img
              alt="No poster Available"
              className="poster"
              height={450}
              width={375}
              src={`http://image.tmdb.org/t/p/w500//${movie.poster_path}`}/>
          </Carousel.Item>
        )
      }) : []
      const showCarousel = this.props.cast ? true : false

    return (
      <div>
      { showCarousel &&
        <Carousel>
          {posters}
        </Carousel>
      }
    </div>

    )
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, null)(Poster)
