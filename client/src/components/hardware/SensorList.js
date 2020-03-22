import React, { Component } from "react";

class SensorList extends Component {
  render() {
    let sensors = [
      {
        id: 1,
        room_name: "Meeting Room",
        health: "Good",
        status: "Connected",
        age: "1 Wk"
      },
      {
        id: 2,
        room_name: "Break room",
        health: "Eh",
        status: "Connected",
        age: "2 Wks"
      }
    ];
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th title="Sensor">Sensor ID</th>
              <th>Room</th>
              <th title="Health">Health</th>
              <th title="Status">Status</th>
              <th title="Age">Age</th>
            </tr>
          </thead>
          <tbody>
            {sensors &&
              sensors.map(sensor => {
                return (
                  <tr key={sensor.id}>
                    <th>{sensor.id}</th>
                    <td>{sensor.room_name}</td>
                    <td>{sensor.health}</td>
                    <td>{sensor.status}</td>
                    <td>{sensor.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SensorList;
