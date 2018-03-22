import axios from "axios";

export function getActorId(query) {
  return dispatch => {
    axios.post("/credits", {url: `https://api.themoviedb.org/3/search/person?api_key=c9fd5be9c253f4a547b51618774afe1a&query=${query}`})
    .then(response => {
      axios.post("/credits/actor", {id: response.data.results[0].id}).then(
        response => {
          localStorage.setItem("cast", JSON.stringify(response.data.cast))
          dispatch(
            {
              type: "GET_ACTOR_ID",
              user: response.data.cast
            }
          )
        })
      })
  }
}

export function persistCredits(credits) {
    let cast = JSON.parse(credits);
    return  {
        type: "PERSIST_CREDITS",
        cast
      }
  }


// const defaultCredits = {}

export default function actorInfoReducer(prevState = {}, action) {
  switch (action.type) {
    case "GET_ACTOR_ID":
      return action.user;
    case "PERSIST_CREDITS":
      return action.cast;
    case "LOGOUT":
      return prevState;
    default:
      return prevState;
  }
}
