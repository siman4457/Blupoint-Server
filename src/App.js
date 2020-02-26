import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import './App.css';
import SignedInNav from "./components/layouts/SignedInNav";
import './App.sass';

function App() {
  return (
    <Router>
      <div className="App">
        <SignedInNav/>
        <Switch>
          <Route path="/dashboard">
            {/*<Dashboard />*/}
          </Route>
        </Switch>

      </div>
    </Router>
  );
}

export default App;
