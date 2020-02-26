import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import './App.sass';
import SignedInNav from "./components/layouts/SignedInNav";
import HardwareHealth from "./components/hardware/HardwareHealth"

function App() {
  return (
    <Router>
      <div className="App">
        <SignedInNav/>
        <Switch>
          {/*<Route path="/" exact component={Home} />*/}
          <Route path="/hardwarehealth" exact component={HardwareHealth} />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
