import React, { Component } from 'react'
import axios from 'axios'
export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensor_name: '',
            sensor_id: '',
            sensor_x: 0,
            sensor_y: 0,
            room_id: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        axios.post('/api/create_sensor', {
            sensor_name: this.state.sensor_name,
            sensor_id: this.state.sensor_id,
            sensor_x: this.state.sensor_x,
            sensor_y: this.state.sensor_y,
            room_id: this.state.room_id
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) { //Might want to avoid using catch to prevent blocking
                console.log(error)
            })

        window.location.href = "/config";

    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });

    };

    handleCancel = () => {
        this.setState({
            sensor_name: '',
            sensor_id: '',
            sensor_x: 0,
            sensor_y: 0,
            room_id: ''
        })
    }

    render() {
        return (
            <div>
                <section>
                    <h1 className="title">Add a new sensor</h1>
                    <div className="field">
                        <input
                            name="sensor_name" className="input" type="text" placeholder="Enter Sensor Name"
                            value={this.state.sensor_name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">

                        <input
                            name="sensor_id" className="input" type="text" placeholder="Enter sensor ID"
                            value={this.state.sensor_id}
                            onChange={this.handleChange}
                        />

                    </div>
                    <div className="level">
                        <div className="field level-item">
                            <label>Enter sensor X position</label>
                            <input
                                name="sensor_x" className="input" type="number"
                                style={{ width: "70px", marginLeft: "15px" }}
                                value={this.state.sensor_x}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field level-item">
                            <label>Enter sensor Y position</label>
                            <input
                                name="sensor_y" className="input" type="number"
                                style={{ width: "70px", marginLeft: "15px" }}
                                value={this.state.sensor_y}
                                onChange={this.handleChange}
                            />
                        </div>

                    </div>
                    <div className="field">
                        <input
                            name="room_id" className="input" type="text" placeholder="Enter Room ID"
                            value={this.state.room_id}
                            onChange={this.handleChange}
                        />
                    </div>
                </section>
                <footer >
                    <button className="button is-success" onClick={this.handleSubmit}>
                        Save
                    </button>
                    <button className="button" onClick={this.handleCancel}>
                        Cancel
                    </button>
                </footer>

            </div >

        );
    }
}
