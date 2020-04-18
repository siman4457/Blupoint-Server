import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "./App.sass";
import SignedInNav from "./components/layouts/SignedInNav";
// import Sensors from "./components/hardware/Sensors";
import Dashboard from "./components/dashboard/Dashboard";
import Config from "./components/config/Config";
// import SignIn from "./components/layouts/SignIn";
import AddSensor from "./components/config/AddSensor";
import RemoveSensor from "./components/config/RemoveSensor";
import AddIDCard from "./components/config/AddIDCard";
import RemoveIDCard from "./components/config/RemoveIDCard";
import AddBuilding from "./components/config/AddBuilding";
import RemoveBuilding from "./components/config/RemoveBuilding";


function App() {
  return (
    <Router>
      <div className="App">
        <SignedInNav />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          {/* <Route path="/signin" component={SignIn} /> */}

          <Route path="/config" exact component={Config} />
          <Route path="/addsensor" exact component={AddSensor} />
          <Route path="/removesensor" exact component={RemoveSensor} />
          <Route path="/addidcard" exact component={AddIDCard} />
          <Route path="/removeidcard" exact component={RemoveIDCard} />
          <Route path="/addbuilding" exact component={AddBuilding} />
          <Route path="/removebuilding" exact component={RemoveBuilding} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
