// import React, { useEffect, useState } from "react";

// import queryString from "query-string";
// import io from "socket.io-client";
// import FormModal from "./FormModal";
// import UseModal from "./UseModal";
import React, { Component } from 'react'
import { Link } from "react-router-dom";
import CardList from "../hardware/CardList"
import "./config.css";
import SensorList from '../hardware/SensorList';
import AddSensor from './AddSensor'
export default class Config extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'CardList' //Default view rendered is CardList
    }
  }

  render() {
    let currentView = this.state.currentView
    function updateView(viewName) {

      if (viewName === 'AddSensor') {
        return (
          <AddSensor />
        )
      }
    }

    return (
      <div className="dashboard-container" >
        <div className="columns is-gapless">
          <div className="column is-one-third">
            <aside className="menu">
              <p className="menu-label">
                Hardware
              </p>
              <ul className="menu-list">
                <li>
                  View all buildings
                </li>
                <li>
                  View all sensors
                </li>
                <li>
                  View all ID cards
                </li>
              </ul>
              <p className="menu-label">
                Actions
              </p>
              <ul className="menu-list">
                <li>
                  <Link to="/addsensor" className="config-control">
                    Add a new sensor
                  </Link>
                  {/* <button className="congig-control" onClick={() => updateView('AddSensor')}>Add a new sensor</button> */}
                </li>
                <li>
                  <Link to="/removesensor" className="config-control">
                    Remove a sensor
                </Link>
                </li>
                <li>
                  <Link to="/addidcard" className="config-control">
                    Add an ID card
              </Link>
                </li>
                <li>
                  <Link to="/removeidcard" className="config-control">
                    Remove an ID card
              </Link>
                </li>
                <li>
                  <Link to="/addbuilding" className="config-control">
                    Add a new building
              </Link>
                </li>
                <li>
                  <Link to="/removebuilding" className="config-control">
                    Remove a building
                </Link>
                </li>
              </ul>
            </aside>

          </div>
          <div className="column is-two-thirds">
            <br />
            {/* <View /> */}
          </div>
        </div>
      </div>



    );
  }
}
