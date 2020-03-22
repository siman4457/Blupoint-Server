import React, { Component } from "react";

class BeaconList extends Component {
    render() {
        let beacons = [
            {
                id: "1JHB3",
                health: "Good",
                status: "Connected",
                age: "1 Wk"
            },
            {
                id: "2IY5",
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
                            <th title="Beacon">Beacon ID</th>
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

export default BeaconList;
