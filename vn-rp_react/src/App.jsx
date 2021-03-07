import HUD from 'components/HUD';
import { createNoti } from 'components/Notification';
import PlayerList from 'components/PlayerList';
import Prompt from 'components/Prompt';
import history from 'global/history';
import mp from 'global/mp';
import Auth from 'pages/Auth';
import Characters from 'pages/Characters';
import Customize from 'pages/Customize';
import Phone from 'pages/Phone';
import rpc from "rage-rpc";
import React, { useState } from 'react';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";

if (mp) {
  rpc.register("cef:showNoti", data => {
    const { type, message } = data;
    createNoti(type, message);
  })
}
function App(props) {
  const [playerList, setPlayerList] = useState(0);
  const [hud, setHud] = useState(0);

  if (mp) {
    rpc.register("cef:show", value => {
      switch (value) {
        case "hud": {
          setHud(!hud);
          break
        }
        case "playerlist": {
          setPlayerList(!playerList);
          break
        }
        default: break
      }
    })
    rpc.register("cef:url", url => history.push(url))
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/characters" component={Characters} />
          <Route exact path="/customize" component={Customize} />
          <Route exact path="/phone" component={Phone} />
        </Switch>
        {playerList ? <PlayerList /> : ""}
        {hud ? <HUD /> : ""}
        <Prompt />
      </Router>
    </div>

  )
}

export default App;