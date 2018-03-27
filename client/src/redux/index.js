// root reducer
import user from "./login";
import result from "./search";
import credits from "./actorInfo";
import addUser from "./signup"
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers(
  {
    user,
    credits,
    result,
    addUser
  }
)

export default createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(thunk))
