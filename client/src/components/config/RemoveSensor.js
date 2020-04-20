import React, { Component } from 'react'
import axios from 'axios'
export default class AddSensor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sensorId: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit() {

        axios.post('/api/remove_sensor', {
            sensorId: this.state.sensorId,
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
            sensorId: ''
        })
    }

    render() {
        return (
            <div style={{ padding: '20px' }}>
                <section>
                    <h1 className="title">Remove a sensor</h1>
                    <div className="field">

                        <input
                            name="sensorId" className="input" type="text" placeholder="Enter sensor ID"
                            value={this.state.sensorId}
                            onChange={this.handleChange}
                        />

                    </div>
                </section>
                <br />
                <footer>
                    <button className="button is-danger" onClick={this.handleSubmit}>
                        Remove
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
