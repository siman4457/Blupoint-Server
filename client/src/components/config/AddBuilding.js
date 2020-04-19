import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default class AddBuilding extends Component {
    constructor(props) {
        super(props);
        this.state = {
            building_name: '',
            building_width: 0,
            building_length: 0,
            rooms: [],
            room_name: '',
            room_id: '',
            room_x: 0,
            room_y: 0,
            room_width: 0,
            room_length: 0

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        axios.post('/api/create_building', {
            building_name: this.state.building_name,
            building_width: this.state.building_width,
            building_length: this.state.building_length,
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
            room_name: this.state.room_name,
            room_id: this.state.room_id,
            room_x: this.state.room_x,
            room_y: this.state.room_y,
            room_width: this.state.room_width,
            room_length: this.state.room_length
        }

        let rooms = this.state.rooms
        rooms.push(room)

        this.setState({
            rooms: rooms,
        })

        this.setState({
            room_name: '',
            room_id: '',
            room_x: 0,
            room_y: 0,
            room_width: 0,
            room_length: 0
        })
    }

    render() {

        function ShowRoomTable(state) {
            let rooms = state.rooms.rooms
            if (rooms.length > 0) {
                return (
                    <div style={{ marginTop: '35px' }}>

                        <h2 className="has-text-centered">Adding the following rooms:</h2>
                        <br />
                        <table className="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>Room Name</th>
                                    <th>Room ID</th>
                                    <th>Room X Position</th>
                                    <th>Room Y Position</th>
                                    <th>Room Width</th>
                                    <th>Room Height</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rooms && rooms.map((r) => (
                                    // TODO: NEED TO CHANGE KEY TO ROOM ID EVENTUALLY?
                                    <tr key={r.room_id}>
                                        <td>{r.room_name}</td>
                                        <td>{r.room_id}</td>
                                        <td>{r.room_x}</td>
                                        <td>{r.room_y}</td>
                                        <td>{r.room_width}</td>
                                        <td>{r.room_length}</td>

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
                                name="building_name" className="input" type="text" placeholder="Ex: Main Facility"
                                value={this.state.building_name}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Building width</label>
                            <input
                                name="building_width" className="input" type="number"
                                value={this.state.building_width}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="field">
                            <label>Building height</label>
                            <input
                                name="building_length" className="input" type="number"
                                value={this.state.building_length}
                                onChange={this.handleChange}
                            />
                        </div>
                        <br />
                        <h1 className="has-text-centered title is-5">Add Rooms</h1>
                        <div className="field">
                            <label>Room Name</label>
                            <input
                                name="room_name" className="input" type="text"
                                value={this.state.room_name}
                                onChange={this.handleChange}
                                placeholder="Ex: Main Floor"
                            />
                            <label>Room ID</label>
                            <input
                                name="room_id" className="input" type="text"
                                value={this.state.room_id}
                                onChange={this.handleChange}
                                placeholder="Ex: Main Floor"
                            />
                            <label>Room X Position</label>
                            <input
                                name="room_x" className="input" type="number"
                                value={this.state.room_x}
                                onChange={this.handleChange}
                            />
                            <label>Room Y Position</label>
                            <input
                                name="room_y" className="input" type="number"
                                value={this.state.room_y}
                                onChange={this.handleChange}
                            />
                            <label>Room Width</label>
                            <input
                                name="room_width" className="input" type="number"
                                value={this.state.room_width}
                                onChange={this.handleChange}
                            />
                            <label>Room Height</label>
                            <input
                                name="room_length" className="input" type="number"
                                value={this.state.room_length}
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
