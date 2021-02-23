import AuthPage from 'pages/AuthPage';
import React from 'react';
import { Route, Switch } from 'react-router';
import {
  BrowserRouter as Router
} from "react-router-dom";
import "./App.scss";

function App(props) {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/auth" component={AuthPage} />
        </Switch>
      </div>
    </Router>
  )
}

export default App;