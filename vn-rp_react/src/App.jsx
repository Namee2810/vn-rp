import Notification from 'components/Notification';
import AuthPage from 'pages/AuthPage';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router';
import {
  HashRouter as Router
} from "react-router-dom";
import { setProduction } from 'store/slice';
import "./App.scss";

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      dispatch(setProduction({ set: true }))
    }
  }, [dispatch])
  return (
    <div>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/auth" component={AuthPage} />
            <Route exact path="/noti" component={Notification} />
          </Switch>
        </div>
      </Router>
    </div>

  )
}

export default App;