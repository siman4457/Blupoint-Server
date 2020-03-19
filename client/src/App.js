import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./App.sass";
import SignedInNav from "./components/layouts/SignedInNav";
import HardwareHealth from "./components/hardware/HardwareHealth";
import Dashboard from "./components/dashboard/Dashboard";
import Config from "./components/config/Config";
import SignIn from "./components/layouts/SignIn";
import AddSensor from "./components/config/AddSensor";
import RemoveSensor from "./components/config/RemoveSensor";
import AddIDCard from "./components/config/AddIDCard";
import RemoveIDCard from "./components/config/RemoveIDCard";

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
          <Route path="/addsensor" exact component={AddSensor} />
          <Route path="/removesensor" exact component={RemoveSensor} />
          <Route path="/addidcard" exact component={AddIDCard} />
          <Route path="/removeidcard" exact component={RemoveIDCard} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
