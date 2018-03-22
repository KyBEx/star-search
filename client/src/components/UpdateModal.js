import React from "react";
import {connect} from "react-redux";
import {updateProfile} from "../redux/login";

class UpdateModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      url: this.props.user.url || "",
      bio: this.props.user.bio || "",
      id: this.props.user.id
    }
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate() {
    if (this.props.user.id !== this.state.id) {
      this.setState({
        url: this.props.user.url || "",
        bio: this.props.user.bio || "",
        id: this.props.user.id
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const stateCopy = Object.assign({}, this.state);
    delete stateCopy.id;
    this.props.updateProfile(this.state.id, stateCopy);
    this.props.close()
  }

render() {
  return(
    <div className="update-modal-content">
        <form className = "form" onSubmit={this.onSubmit}>
          <p class="update-header">Update Image</p>
         <input className="modal-content"
           type="text"
           placeholder="Input new image URL here"
           name="url"
           value={this.state.url}
           onChange={this.handleChange}
         />
         <p class="update-header">Update Bio</p>
         <textarea className="modal-content textarea" maxLength="500"
           onChange={this.handleChange}
           name="bio"
           value={this.state.bio}
         ></textarea>
         <button className = "standard-button">Update / Close</button>
       </form>
    </div>
  )}
}

function mapStateToProps(state) {
  return state
}

export default connect(mapStateToProps, {updateProfile})(UpdateModal);
