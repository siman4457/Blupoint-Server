import React, { Component } from 'react'
import ConnectedCardsList from './ConnectedCardsList'
export default class Sensor extends Component {
    render() {
        const { connectedCards } = this.props
        return (
            <div>
                <img className="sensor-icon" src={process.env.PUBLIC_URL + '/sensor_icon.png'} alt="Sensor icon failed to load" />
                <ConnectedCardsList connectedCards={connectedCards} />
            </div>
        )
    }
}
