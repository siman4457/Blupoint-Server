import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default class AddBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buildingName: '',
            building_x: 0,
            building_y: 0,
            rooms: [],
            roomName: '',
            room_x: 0,
            room_y: 0,

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        console.log('check state', this.state)

        axios.post('/api/create_building', {
            buildingName: this.state.buildingName,
            building_x: this.state.building_x,
            building_y: this.state.building_y,
            rooms: this.state.rooms
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

    addRoom() {
        //Add validation to see if these are filled before adding to rooms
        let room = {
            roomName: this.state.roomName,
            room_x: this.state.room_x,
            room_y: this.state.room_y
        }

        let rooms = this.state.rooms
        rooms.push(room)

        this.setState({
            rooms: rooms,
        })

        this.setState({
            roomName: '',
            room_x: 0,
            room_y: 0
        })
    }

    render() {
        // let { rooms } = this.state

        function ShowRoomTable(state) {
            let rooms = state.rooms.rooms
            if (rooms.length > 0) {
                return (
                    <div style={{ marginTop: '35px' }}>

                        <h2 className="has-text-centered">Adding the following rooms:</h2>
                        <br />
                        <table style={{ width: '100%' }}>
                            <thead>
                                <tr>
                                    <th>Room Name</th>
                                    <th>Room Width</th>
                                    <th>Room Height</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms && rooms.map((r) => (
                                    // TODO: NEED TO CHANGE KEY TO ROOM ID EVENTUALLY?
                                    <tr key={r.roomName}>
                                        <td>{r.roomName}</td>
                                        <td>{r.room_x}</td>
                                        <td>{r.room_y}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                )
            }
            else {
                return (
                    <div></div>
                )
            }
        }

        return (
            <div className="modal-container">
                <div className="modal-background"></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">Add a new Building</p>
                        <Link to={'/config'}
                            className="delete"
                            aria-label="close"
                        ></Link>
                    </header>
                    <section className="modal-card-body">
                        {/* <h1 className="title">Add a new sensor</h1> */}
                        <div className="field">
                            <label>Building Name</label>
                            <input
                                name="buildingName" className="input" type="text" placeholder="Ex: Main Facility"
                                value={this.state.buildingName}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Building width</label>
                            <input
                                name="building_x" className="input" type="number"
                                value={this.state.building_x}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Building height</label>
                            <input
                                name="building_y" className="input" type="number"
                                value={this.state.building_y}
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <h1 className="has-text-centered title is-5">Add Rooms</h1>
                        <div className="field">
                            <label>Room Name</label>
                            <input
                                name="roomName" className="input" type="text"
                                value={this.state.roomName}
                                onChange={this.handleChange}
                                placeholder="Ex: Main Floor"
                            />
                            <label>Room Width</label>
                            <input
                                name="room_x" className="input" type="number"
                                value={this.state.room_x}
                                onChange={this.handleChange}
                            />
                            <label>Room Height</label>
                            <input
                                name="room_y" className="input" type="number"
                                value={this.state.room_y}
                                onChange={this.handleChange}
                            />

                            <button onClick={this.addRoom.bind(this)} className="button is-pulled-right is-info">+</button>

                            <ShowRoomTable rooms={this.state} />

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
        );
    }
}
