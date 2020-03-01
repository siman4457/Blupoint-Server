import React, { Component } from "react";

class HardwareList extends Component {
  render() {
    let beacons = [
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
              <th title="Beacon">Beacon #</th>
              <th>Room</th>
              <th title="Health">Health</th>
              <th title="Status">Status</th>
              <th title="Age">Age</th>
            </tr>
          </thead>
          <tbody>
            {beacons &&
              beacons.map(beacon => {
                return (
                  <tr key={beacon.id}>
                    <th>{beacon.id}</th>
                    <td>{beacon.room_name}</td>
                    <td>{beacon.health}</td>
                    <td>{beacon.status}</td>
                    <td>{beacon.age}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default HardwareList;
