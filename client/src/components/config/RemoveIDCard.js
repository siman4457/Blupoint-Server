import React, { Component } from 'react'
import axios from 'axios'

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

        axios.post('/api/remove_id_card', {
            id: this.state.id,
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
            idCardID: ''
        })
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <section >
                    <h1 className="title">Remove an ID card</h1>
                    <div className="field">
                        <input
                            name="id" className="input" type="text" placeholder="Enter ID Card Number"
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
