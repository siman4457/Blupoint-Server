import React, { Component } from "react";

class BuildingList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      buildings: [],
      isLoaded: false
    };
  }

  componentDidMount() {
    fetch('/api/get_buildings')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            buildings: result
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
    const { error, isLoaded, buildings } = this.state;
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
          <section className="section">
            <div className="columns is-centered">
              <div className="column is-narrow">
                <table className="table is-striped is-fullwidth">
                  <thead>
                    <tr>
                      <th title="Building">Building</th>
                      <th title="Name">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {buildings &&
                      buildings.map(building => {
                        return (
                          <tr key={building.building_id}>
                            <td></td>
                            <td>{building.building_name}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>


        </div>
      )
    }
  }
}

export default BuildingList;
