import axios from "axios";

export function signup(user) {
  return dispatch => {axios.post("/auth/signup", user).then(response => {
    dispatch({
      type: "SIGNUP",
      user: response.data
    })
  })
  .catch(err => {
    console.log(err.response)
    dispatch({
      type: "ERROR_EXISTING_USER",
      error: err.response
    })
  })
  }
}


export default function signupReducer(prevState = {}, action) {
  switch (action.type) {
    case "SIGNUP":
        return action.user;
    case "ERROR_EXISTING_USER":
      return action.error;

    default:
      return prevState
  }
}
