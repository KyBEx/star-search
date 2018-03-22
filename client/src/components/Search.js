import React from "react";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {search} from "../redux/search";

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();

    if (this.state.firstName === "" ||
        this.state.lastName === "") {
        } else {
            this.props.search(this.state);
            this.setState({
              firstName: "",
              lastName: "",
          });
          this.props.history.push("/result");

      };
  };

  render() {
    return (
      <div className="search-container">
        <form className = "search" onSubmit={this.onSubmit}>
          <input type="text" placeholder="first name" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" placeholder="last name" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
          <button>Search</button>
        </form>
      </div>
    )
  }
}

export default withRouter(connect(null, {search}) (Search))
