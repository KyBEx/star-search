import React from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {getActorId} from "../redux/actorInfo";

class Credits extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      credits: false
    }
    this.showCredits = this.showCredits.bind(this);
  }

  componentDidUpdate() {
      if(this.state.credits) {
        const container = ReactDOM.findDOMNode(this.refs.container);
        setTimeout(() => window.scrollTo(0, container.offsetTop), 1)
      }
  }

  showCredits() {
    if (!this.state.credits) {
      this.setState({
        credits: true
      });
    } else {
      this.setState({
        credits: false
      })
    }

  }
  
  render() {

    const movies = Object.keys(this.props.cast).length > 0 ? this.props.cast.map((movie, i) => {
      return (
        <div className="credits-body" key={i}>
          <h4>{movie.title}</h4>
          <h6>Character: {movie.character}</h6>
          <p>{movie.overview}</p>
        </div>
      )
    }) : null

    return (
      <div className="credits-container" ref="container">
        <button id="credits-button" onClick={this.showCredits}>Credits</button>
        {
          this.state.credits &&
          <div className="credits">
            {movies}
          </div>
        }
      </div>)
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps, {getActorId})(Credits)
