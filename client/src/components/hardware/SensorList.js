import React, { Component } from "react";

class SensorList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      sensors: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('/api/get_sensors')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            sensors: result
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        });
  }


  render() {
    const { error, isLoaded, sensors } = this.state;
    if (error) {
      return (
        <div>Error: {error.message}</div>
      )
    }
    else if (!isLoaded) {
      return (
        <div>Loading...</div>
      )
    }
    else {
      return (
        <div>
          <div className="container">
            <section className="section">
              <div className="columns is-centered">
                <div className="column is-narrow">
                  <table className="table">
                    <thead>
                      <tr>
                        <th title="Sensor">Sensor ID</th>
                        <th title="Name">Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sensors &&
                        sensors.map(sensor => {
                          return (
                            <tr key={sensor.id}>
                              <th>{sensor.id}</th>
                              <td>{sensor.name}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>

        </div>
      )
    }
  }
}

export default SensorList;
