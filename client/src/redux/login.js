import axios from "axios";


axios.interceptors.request.use((config)=> {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  return config
})

export function login(user) {
  return dispatch => {axios.post("/auth/login", user).then(response => {

    localStorage.setItem("token", response.data.token)
    dispatch({
      type: "LOGIN",
      user: response.data
    });
  })
  .catch(err => {
    console.log(err.response)
    dispatch({
      type: "ERROR",
      user: err.response
    })
  })
}
}

export function signup(user) {
  return dispatch => {axios.post("/auth/signup", user).then(response => {
    dispatch({
      type: "SIGNUP",
      user: response.data
    })
  })
  }
}

export function persistLogin(token) {
  return dispatch => {axios.post("api/user/persist", token).then(response => {
    dispatch(
      {
        type: "PERSIST",
        user: response
      }
    )
  })
  }
}

export function logout(history) {
  localStorage.removeItem("token");
  localStorage.removeItem("cast");
  history.push("/");
  return {
    type: "LOGOUT"
  }
}

export function updateProfile(url, data) {
  return dispatch => {axios.put(`api/user/${url}`, data).then(response => {
    dispatch(
      {
        type: "UPDATE",
        user: response.data
      })
    })
  }
}

export function deleteProfile(url, history) {
  return dispatch => {axios.delete(`api/user/${url}`).then(
    response => {
      localStorage.removeItem("token");
      history.push("/");
      dispatch(
        {
          type: "DELETE",
          user: response.data
        }
      )
    }
  )}
}

const defaultUser = {};


export default function loginReducer(prevState = defaultUser, action) {
  switch (action.type) {
    case "LOGIN":
    let firstName = action.user.user.firstName.charAt(0).toUpperCase() + action.user.user.firstName.slice(1);
    let lastName = action.user.user.lastName.charAt(0).toUpperCase() + action.user.user.lastName.slice(1);
      return {
        token: action.user.token,
        userName: action.user.user.userName,
        password: action.user.user.password,
        firstName,
        lastName,
        email: action.user.user.email,
        url: action.user.user.url || "http://laoblogger.com/images/default-profile-picture-5.jpg",
        bio: action.user.user.bio,
        id: action.user.user._id
      };
    case "PERSIST":
      let firstName2 = action.user.data.firstName.charAt(0).toUpperCase() + action.user.data.firstName.slice(1);
      let lastName2 = action.user.data.lastName.charAt(0).toUpperCase() + action.user.data.lastName.slice(1);
      return {
        token: action.user.config.data,
        userName: action.user.data.userName,
        password: action.user.data.password,
        firstName: firstName2,
        lastName: lastName2,
        email: action.user.data.email,
        url: action.user.data.url,
        bio: action.user.data.bio,
        id: action.user.data._id
      };
    case "LOGOUT":
      return defaultUser;
    case "UPDATE":
      return {
        token: prevState.token,
        userName: action.user.userName,
        password: action.user.password,
        firstName: action.user.firstName,
        lastName: action.user.lastName,
        email: action.user.email,
        url: action.user.url,
        bio: action.user.bio,
        id: action.user._id
      };
    case "DELETE":
      return defaultUser;
    case "ERROR":
      return action.user;

    default:
      return prevState
  }
}
