import React, { Component } from 'react'

export default class SensorStatus extends Component {
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
                <div className="card">
                    <div className="card-content">
                        <div className="content">
                            {sensors &&
                                sensors.map(sensor => {
                                    return (
                                        <div key={sensor.id}>
                                            <p>Sensor ID: {sensor.id} Name: {sensor.name}</p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>

                </div>
            )
        }
    }
}
