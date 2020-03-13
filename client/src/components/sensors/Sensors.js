import React, { Component } from "react";

export default class Sensors extends Component {
  constructor() {
    super();
    this.state = {
      sensors: []
    };
  }

  componentDidMount() {
    fetch("/api/get_sensors")
      .then(res => res.json())
      .then(sensors =>
        this.setState({ sensors }, () =>
          console.log("sensors fetched:", sensors)
        )
      );
  }

  render() {
    return (
      <div>
        <h2>Sensor</h2>
        <ul>
          {this.state.sensors.map(sensor => (
            <li key={sensor.id}>{sensor.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}
