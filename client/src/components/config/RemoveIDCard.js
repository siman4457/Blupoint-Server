import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            idCardID: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        // console.log(JSON.stringify({
        //     name: 'test'
        // }))

        fetch('/api/remove_id_card', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                idCardID: this.state.idCardID,
            }),
        }).then(res => res.json())
            .catch(err => {
                console.log(err);
                console.log(JSON.stringify({
                    idCardID: this.state.idCardID,
                }));
            }
            );
        // .then(response => {
        //   console.log(response)
        // });

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
                            <p className="modal-card-title">Remove an ID Card</p>
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
                                        name="idCardID" className="input" type="text" placeholder="Enter ID Card Number"
                                        value={this.state.idCardID}
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

                        </section>
                        <footer className="modal-card-foot">
                            <button className="button is-danger" onClick={this.handleSubmit}>
                                Remove
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
