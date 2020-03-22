import React, { Component } from 'react';
import SensorList from "./SensorList";
// import 'bulma/css/bulma.css';

class Sensors extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <SensorList />
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        );
    }
}

export default Sensors;