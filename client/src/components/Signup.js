import React from "react";
import {connect} from "react-redux";

import {signup} from "../redux/signup";

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

  componentWillReceiveProps(nextProps) {
      console.log(nextProps)
      if (nextProps.addUser.data) {
          if(nextProps.addUser.data.err === "username already exists") {
              this.setState({
                  validation: "That user already exists"
              });
              document.getElementById("signup-validation").style.opacity = 1;
              document.getElementById("first-signup").focus();
      }
    }
    if (nextProps.addUser.msg === "Your account has been created."){
        this.setState({
            validation: "Please login to continue"
        });
        document.getElementById("signup-validation").style.opacity = 1;
    }
  }


  // componentDidMount() {
  //     if (this.state.validation) {
  //         document.getElementById("signup-validation").style.opacity = 1;
  //     }
  // }


  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    document.getElementById("signup-validation").style.opacity = 0;
  }

  onSubmit(e){
    e.preventDefault();

    if (this.state.userName === "" ||
        this.state.password === "" ||
        this.state.firstName === "" ||
        this.state.lastName === "" ||
        this.state.email === "") {
            document.getElementById("signup-validation").innerHTML = "Fields cannot be blank";
            document.getElementById("signup-validation").style.opacity = 1;
            document.getElementById("first-signup").focus();
        } else {
            delete this.props.validation;
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
          <input id="first-signup" type="text" placeholder="username" name="userName" value={this.state.userName} onChange={this.handleChange}/>
          <input type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange}/>
          <input type="text" placeholder="first name" name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
          <input type="text" placeholder="last name" name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
          <input type="text" placeholder="email" name="email" value={this.state.email} onChange={this.handleChange}/>
          <p id="signup-validation">{this.state.validation}</p>
          <button>Sign Up</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {addUser: state.addUser}
}

export default connect(mapStateToProps, {signup}) (Signup);
