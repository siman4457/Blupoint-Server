import React, { Component } from 'react'
import CardList from "../hardware/CardList"
import BuildingList from "../hardware/BuildingList"
import "./config.css";
import SensorList from '../hardware/SensorList';
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
        return (<BuildingList />)
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
                  <a className="config-control" onClick={() => this.updateView('BuildingList')}>View all buildings</a>
                </li>
                <li>
                  <a className="config-control" onClick={() => this.updateView('SensorList')}>View all sensors</a>
                </li>
                <li>
                  <a className="config-control" onClick={() => this.updateView('CardList')}>View all ID cards</a>
                </li>
              </ul>
              <p className="menu-label">
                Actions
              </p>
              <ul className="menu-list">
                <li>
                  <a className=" config-control" onClick={() => this.updateView('AddSensor')}>Add a new sensor</a>
                </li>

                <li>
                  <a className=" config-control" onClick={() => this.updateView('RemoveSensor')}>Remove a sensor</a>
                </li>

                <li>
                  <a className=" config-control" onClick={() => this.updateView('AddIDCard')}>Add an ID card</a>
                </li>

                <li>
                  <a className=" config-control" onClick={() => this.updateView('RemoveIDCard')}>Remove an ID card</a>
                </li>

                <li>
                  <a className=" config-control" onClick={() => this.updateView('AddBuilding')}>Add a new building</a>
                </li>

                <li>
                  <a className=" config-control" onClick={() => this.updateView('RemoveBuilding')}>Remove a building</a>
                </li>

              </ul>
            </aside>
          </div>

          <div className="column is-two-thirds">
            <div style={{
              maxHeight: '100vh',
              overflow: 'auto'
            }}>
              <View currentView={this.state.currentView} />
            </div>
          </div>

        </div>
      </div>
    );
  }
}