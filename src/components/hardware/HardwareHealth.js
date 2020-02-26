import React, {Component} from 'react';
import HardwareList from "./HardwareList";
import 'bulma/css/bulma.css';

class HardwareHealth extends Component {
    render() {
        return (
            <div>
                <div className="columns">
                    <div className="column"/>
                    <div className="column is-two-thirds"><HardwareList/></div>
                    <div className="column"/>
                </div>

            </div>
        );
    }
}

export default HardwareHealth;