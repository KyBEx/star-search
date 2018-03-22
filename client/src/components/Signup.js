import React from "react";
import {connect} from "react-redux";

import {signup} from "../redux/login";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
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

    if (this.state.userName === "" ||
        this.state.password === "" ||
        this.state.firstName === "" ||
        this.state.lastName === "" ||
        this.state.email === "") {
            document.getElementById("signup-validation").style.visibility = "visible";
        } else {
            document.getElementById("signup-success").style.visibility = "visible";
            document.getElementById("signup-validation").style.visibility = "hidden";
            this.props.signup(this.state);
            this.setState({
              userName: "",
              password: "",
              firstName: "",
              lastName: "",
              email: ""
          });
      };
  };

  render() {
    return (
      <div className="signup-container">
        <form className = "signup" onSubmit={this.onSubmit}>
          <input type="text" placeholder="username" name="userName" value={this.state.userName} onChange={this.handleChange}/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <input type="text" placeholder="first name" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" placeholder="last name" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
          <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          <p id="signup-validation">Please fill out all the fields.</p>
          <p id="signup-success">Login to access your profile.</p>
          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

export default connect(null, {signup}) (Signup);
