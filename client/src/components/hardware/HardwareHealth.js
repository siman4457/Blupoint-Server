import React, {Component} from 'react';
import HardwareList from "./HardwareList";
// import 'bulma/css/bulma.css';

class HardwareHealth extends Component {
    render() {
        return (
            <div>
                <div className="container">
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <HardwareList/>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        );
    }
}

export default HardwareHealth;