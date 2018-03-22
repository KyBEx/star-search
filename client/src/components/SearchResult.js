import React from "react";
import {connect} from "react-redux";
import { getActorId} from "../redux/actorInfo";
import { search, clearResults } from "../redux/search";
import {withRouter} from "react-router-dom";
import ProfileData from "./ProfileData";
import Credits from "./Credits";
import Poster from "./Poster";



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCredits: false
    };
  }

  componentWillMount() {
    //   persists the search result if user backs away or refreshes page
      if (localStorage.getItem("result") && !this.props.result.firstName) {
          let result = JSON.parse(localStorage.getItem("result"));
          this.props.getActorId(result);
          let searchObject = {};
          searchObject.firstName = result.slice(0, result.indexOf("%"));
          searchObject.lastName = result.slice(result.indexOf("0")+1);
          this.props.search(searchObject);
      }
  }

  componentWillReceiveProps(nextProps) {
      if (nextProps.result.firstName !== this.props.result.firstName) {
        this.props.getActorId(`${nextProps.result.firstName}%20${nextProps.result.lastName}`);
      }
      this.setState({
        showUpdate: false
      })
    }


  render(){

    return(

      <main>
          <div>
            <div className="logout-bar">
                <li> <a onClick={() => {this.props.clearResults();
                    this.props.history.push("/")}}>Home</a></li>
                <p>Now showing {this.props.result.firstName} {this.props.result.lastName}</p>
            </div>
          <main>
            <ProfileData firstName = {this.props.result.firstName}
              bio={this.props.result.bio} img={this.props.result.url}/>
          </main>
        <Poster cast={this.props.credits}/>
        <div className="profile-separator"></div>
        <Credits cast={this.props.credits}/>
          </div>
      </main>
    )}
}


function mapStateToProps(state) {
  return state
}

export default withRouter(
    connect(mapStateToProps, {getActorId, search, clearResults})(Profile)
);
