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

    handleCancel = () => {
        this.setState({
            name: '',
            id: '',
        })
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <section>
                    <h1 className="title">Add a new ID Card</h1>
                    <div className="field">
                        <input
                            name="name" className="input" type="text" placeholder="Enter Card Name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="field">
                        <input
                            name="id" className="input" type="text" placeholder="Enter Card ID"
                            value={this.state.id}
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
