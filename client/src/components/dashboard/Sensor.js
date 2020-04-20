import React, { Component } from 'react'
export default class Sensor extends Component {
    render() {
        const { connectedCards } = this.props
        const { sensorId } = this.props
        let cards_text = ''
        if (connectedCards.length == 1) {
            cards_text = 'Card'
        }
        else {
            cards_text = 'Cards'
        }

        const { style } = this.props
        return (
            <div style={style}>
                <img className="sensor-icon" src={process.env.PUBLIC_URL + '/sensor_icon.png'} alt="Sensor icon failed to load" />

                <p className="has-text-white id-card-label">
                    {sensorId} <br />
                    {connectedCards.length} {cards_text} Connected
                </p>


            </div>
        )
    }
}
