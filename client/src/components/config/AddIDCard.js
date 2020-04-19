import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'
export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            id: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {


        axios.post('/api/create_id_card', {
            name: this.state.name,
            id: this.state.id
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
                            <p className="modal-card-title">Add a new ID Card</p>
                            <Link to={'/config'}
                                className="delete"
                                aria-label="close"
                            ></Link>
                        </header>
                        <section className="modal-card-body">
                            {/* <h1 className="title">Add a new sensor</h1> */}
                            <div className="field">
                                <p className="control has-icons-left has-icons-right">
                                    <input
                                        name="name" className="input" type="text" placeholder="Enter Card Name"
                                        value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-envelope"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-check" />
                                    </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control has-icons-left">
                                    <input
                                        name="id" className="input" type="text" placeholder="Enter Card ID"
                                        value={this.state.id}
                                        onChange={this.handleChange}
                                    />
                                    <span className="icon is-small is-left">
                                        <i className="fa fa-address-card" aria-hidden="true" />
                                    </span>
                                </p>
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
                </div>
            </div >
        );
    }
}
