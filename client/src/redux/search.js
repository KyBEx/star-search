import axios from "axios";


export function search(user) {
  return dispatch => {axios.post("/search/", user).then(response => {
    let {firstName, lastName} = response.data.result;
    firstName = firstName.charAt(0).toUpperCase()+firstName.slice(1);
    lastName = lastName.charAt(0).toUpperCase()+lastName.slice(1);
    let data = firstName+"%20"+lastName;
    console.log(data)
    localStorage.setItem("result", JSON.stringify(data));
    dispatch({
      type: "SEARCH",
      user: response.data
    });
  })
  .catch(err => {
    console.log(err.response)
    dispatch({
      type: "ERROR",
      user: err
    })
  })
}
}

export function clearResults() {
    localStorage.removeItem("result");
    localStorage.removeItem("cast");
     return {
         type:"CLEAR_RESULTS"
     }
 }
export default function searchReducer(prevState = {}, action) {
  switch (action.type) {
    case "SEARCH":
      let firstName = action.user.result.firstName.charAt(0).toUpperCase() + action.user.result.firstName.slice(1);
      let lastName = action.user.result.lastName.charAt(0).toUpperCase() + action.user.result.lastName.slice(1);
      return {
        firstName,
        lastName,
        url: action.user.result.url,
        bio: action.user.result.bio,
      };
     case "ERROR":
     console.log(action.user)
       return action.user.result;
     case "CLEAR_RESULTS":
        return prevState;
     default:
      return prevState;
  }
}
