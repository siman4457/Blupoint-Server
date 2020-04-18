import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorName: '',
            sensorId: '',
            sensor_x: 0,
            sensor_y: 0,
            room_id: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        axios.post('/api/create_sensor', {
            sensorName: this.state.sensorName,
            sensorId: this.state.sensorId,
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

    render() {
        return (
            <div className="modal-container">
                <div>
                    <div className="modal-background"></div>
                    <div className="modal-card">
                        <header className="modal-card-head">
                            <p className="modal-card-title">Add a new Sensor</p>
                            <Link to={'/config'}
                                className="delete"
                                aria-label="close"
                            ></Link>
                        </header>
                        <section className="modal-card-body">
                            {/* <h1 className="title">Add a new sensor</h1> */}
                            <div className="field">

                                <input
                                    name="sensorName" className="input" type="text" placeholder="Enter Sensor Name"
                                    value={this.state.sensorName}
                                    onChange={this.handleChange}
                                />


                            </div>
                            <div className="field">

                                <input
                                    name="sensorId" className="input" type="text" placeholder="Enter sensor ID"
                                    value={this.state.sensorId}
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
                                {/* We want to eventually be able to allow the user to select which room from a drop down */}
                                <label>Enter Room ID</label>
                                <input
                                    name="room_id" className="input" type="number"
                                    style={{ width: "70px", marginLeft: "15px" }}
                                    value={this.state.room_id}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-success" onClick={this.handleSubmit}>
                                Save
                            </button>
                            <Link className="button" to={"/config"}>
                                Cancel
                            </Link>
                        </footer>
                    </div>
                </div >
            </div >
        );
    }
}
