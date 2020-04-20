import React, { Component } from 'react'
import { Link } from "react-router-dom"
import axios from 'axios'

export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buldingID: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {
        axios.post('/api/remove_building', {
            buldingID: this.state.buldingID
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
            buldingID: ''
        })
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <section>
                    <h1 className="title">Remove a building</h1>
                    <div className="field">
                        <input
                            name="buldingID" className="input" type="text" placeholder="Enter building ID"
                            value={this.state.buldingID}
                            onChange={this.handleChange}
                        />
                    </div>
                </section>
                <br />
                <footer>
                    <button className="button is-danger" onClick={this.handleSubmit}>
                        Save
                    </button>
                   &emsp;
                    <button className="button" onClick={this.handleCancel}>
                        Cancel
                    </button>
                </footer>
            </div>
        );
    }
}
