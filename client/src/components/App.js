import React from "react";
import Login from "./Login";
import Profile from "./Profile";
import SearchResult from "./SearchResult"
import {Switch, Route} from "react-router-dom";
import "../style.css"

function App (props) {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/profile" component={Profile}/>
        <Route path ="/result" component={SearchResult}/>
      </Switch>
    </main>
  )
}

export default App;
