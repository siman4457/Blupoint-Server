import React, { Component } from 'react';
import BeaconList from './BeaconList';

class Sensors extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <BeaconList />
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        );
    }
}

export default Sensors;