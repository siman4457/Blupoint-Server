// import React, { useEffect, useState } from "react";

// import queryString from "query-string";
// import io from "socket.io-client";
// import FormModal from "./FormModal";
// import UseModal from "./UseModal";
import React, { Component } from 'react'
import CardList from "../hardware/CardList"
import "./config.css"
import SensorList from '../hardware/SensorList'
import AddSensor from './AddSensor'
import AddIDCard from './AddIDCard'
import AddBuilding from './AddBuilding'
import RemoveBuilding from './RemoveBuilding'
import RemoveIDCard from './RemoveIDCard'
import RemoveSensor from './RemoveSensor'

export default class Config extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentView: 'CardList' //Default view rendered is CardList
    }
  }

  updateView(view) {
    this.setState({
      currentView: view
    })
  }

  render() {

    function View({ currentView }) {
      console.log('test', currentView)

      if (currentView === 'AddSensor') {
        return (<AddSensor />)
      }
      if (currentView === 'RemoveSensor') {
        return (<RemoveSensor />)
      }
      else if (currentView === 'AddIDCard') {
        return (<AddIDCard />)
      }
      else if (currentView === 'RemoveIDCard') {
        return (<RemoveIDCard />)
      }
      else if (currentView === 'AddBuilding') {
        return (<AddBuilding />)
      }
      else if (currentView === 'RemoveBuilding') {
        return (<RemoveBuilding />)
      }
      else if (currentView === 'CardList') {
        return (<CardList />)
      }
      else if (currentView === 'SensorList') {
        return (<SensorList />)
      }
      else if (currentView === 'BuildingList') {
        return (<p>Need to make building list</p>)
      }
      else {
        return (<CardList />)
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
                  <button className="button config-control" onClick={() => this.updateView('BuildingList')}>View all buildings</button>
                </li>
                <li>
                  <button className="button config-control" onClick={() => this.updateView('SensorList')}>View all sensors</button>
                </li>
                <li>
                  <button className="button config-control" onClick={() => this.updateView('CardList')}>View all ID cards</button>
                </li>
              </ul>
              <p className="menu-label">
                Actions
              </p>
              <ul className="menu-list">
                <li>
                  <button className="button config-control" onClick={() => this.updateView('AddSensor')}>Add a new sensor</button>
                </li>

                <li>
                  <button className="button config-control" onClick={() => this.updateView('RemoveSensor')}>Remove a sensor</button>
                </li>

                <li>
                  <button className="button config-control" onClick={() => this.updateView('AddIDCard')}>Add an ID card</button>
                </li>

                <li>
                  <button className="button config-control" onClick={() => this.updateView('RemoveIDCard')}>Remove an ID card</button>
                </li>

                <li>
                  <button className="button config-control" onClick={() => this.updateView('AddBuilding')}>Add a new building</button>
                </li>

                <li>
                  <button className="button config-control" onClick={() => this.updateView('RemoveBuilding')}>Remove a building</button>
                </li>

              </ul>
            </aside>
          </div>

          <div className="column is-two-thirds">
            <div className="container">
              <View currentView={this.state.currentView} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}
