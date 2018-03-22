import React from "react";
import { connect } from "react-redux";
import { login, logout } from "../redux/login";
import {withRouter} from "react-router-dom";
import Search from "./Search";
import Signup from "./Signup";


class Login extends React.Component {
  constructor() {
    super();
    this.state= {
      userName: "",
      password: "",
      loginAttempt: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user.status) {
      alert("username or password is incorrect");
    } else {
      this.props.history.push("/profile");
    }


  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }


  onSubmit(e){
    e.preventDefault();

    this.props.login(this.state);
    this.setState({
      loginAttempt: true
    })
  }


render() {

  return(
    <main className="login-container">
      <form className = "login" onSubmit={this.onSubmit}>
        <div className = "navFloat">
        <input onChange={this.handleChange} name="userName" type="text" placeholder="username" value={this.state.userName}/>
        <input onChange={this.handleChange} name="password" type="password" placeholder="password" value={this.state.password}/>
        <button>Login</button>
        </div>
      </form>
      <div className="login-background">
        <div className="login-text">Are you a budding actor? An established actress?  Create an account today to increase your visibility and get more roles!</div>
        <Signup className = "signup"/>
        <div className="login-text">Are you a casting director? Search our database to find the  right talent for your project!
        </div>
        <Search/>
      </div>
    </main>
    )
  }
}
function mapStateToProps(state) {
  return state
}

export default withRouter(
  connect(mapStateToProps, { login, logout})(Login)
);
