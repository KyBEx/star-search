import React from "react";
import {connect} from "react-redux";
import {persistLogin, logout, updateProfile, deleteProfile} from "../redux/login";
import { getActorId, persistCredits } from "../redux/actorInfo"
import ProfileData from "./ProfileData";
import UpdateModal from "./UpdateModal";
import Credits from "./Credits";
import Poster from "./Poster";



class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.user.id,
      showUpdate: false,
      showInfo: true,
      hasCredits: false
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.updateModal = this.updateModal.bind(this);
  }

  componentDidMount() {

      if (this.props.user.firstName) {
        this.props.getActorId(`${this.props.user.firstName}%20${this.props.user.lastName}`)
      }
      this.setState({
        showUpdate: false
      })
      
      if(!this.props.user.token && !this.props.user.status) {
        this.props.persistLogin(localStorage.getItem("token"));
      }

      if (!localStorage.getItem("token")) {
            this.props.history.push("/")
        }

    }
    componentWillReceiveProps(nextProps) {
      console.log(nextProps.credits)
      if(Object.keys(nextProps.credits).length === 0) {
        this.props.persistCredits(localStorage.getItem("cast"));
        this.setState({
          hasCredits: true
        })
      }
    }

    updateModal(){
      if(!this.state.showUpdate) {
        this.setState({showUpdate: true})
      } else {
        this.setState({showUpdate: false})
      }
    }

    handleDelete() {
      this.props.deleteProfile(this.props.user.id, this.props.history);
    }

  render(){

    // let showAll =  true ;

    return(

      <main>
          <div>
            <div className="logout-bar">
                <li> <a onClick={() => this.props.logout(this.props.history)}>Log Out</a></li>
                <li onClick={this.handleDelete} ><a>Delete Profile</a></li>
                <li onClick={this.updateModal} id="update-profile"><a>Update Profile</a></li>
                <p>Hello, {this.props.user.firstName}</p>
            </div>
          <main>
            <ProfileData firstName = {this.props.user.firstName}
              bio={this.props.user.bio} img={this.props.user.url}/>
          </main>
        {
          this.state.showUpdate &&
          <div className="update-modal">
          <UpdateModal close={()=> {this.updateModal()}}/>
          </div>
        }

        <Poster cast={this.props.credits}/>
        <div className="profile-separator"></div>
        <Credits cast={this.props.credits}/>
          </div>
    </main>
    )
  }
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {persistLogin, logout, updateProfile, deleteProfile, getActorId, persistCredits})(Profile);
