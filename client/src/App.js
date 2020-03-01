import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./App.sass";
import SignedInNav from "./components/layouts/SignedInNav";
import HardwareHealth from "./components/hardware/HardwareHealth";
import Dashboard from "./components/dashboard/Dashboard";
import Config from "./components/config/Config";
import SignIn from "./components/layouts/SignIn";

function App() {
  return (
    <Router>
      <div className="App">
        <SignedInNav />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/signin" component={SignIn} />
          <Route path="/hardwarehealth" exact component={HardwareHealth} />
          <Route path="/config" exact component={Config} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
