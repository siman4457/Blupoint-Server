import React, { Component } from 'react'
import axios from 'axios'
export default class ConnectedCardsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            cardLocations: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        axios.all([
                axios.get('/api/get_card_locations'),
                axios.get('/api/get_cards'),
                axios.get('/api/get_sensors')
            ])
            .then(axios.spread((cardLocationRes, cardsRes, sensorsRes) => {
                // let sensors = sensorsRes.data
                this.setState({
                    isLoaded: true,
                    cardLocations: cardLocationRes.data,
                    sensors: sensorsRes.data,
                    cards: cardsRes.data,
                })
                console.log(this.state)
            }))
    }

    render() {
        const { cardLocations, cards, sensors } = this.state

        const sidebar_styling = {
            height: '100%',
            minHeight: '100vh',
            maxWidth: '300px',
            backgroundColor: '#ffffff'
        }

        const table_styling = {
            maxHeight: '50%',
            overflow: 'auto'
        }

        return (
            <div style={sidebar_styling}>
                <br />
                <p className="has-text-centered title is-4">Connected Cards</p>
                <div className="table-container" style={table_styling}>
                    <table className="table is-striped is-fullwidth" >
                        <thead>
                            <tr>
                                <th>Sensor ID</th>
                                <th>Card ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cardLocations &&
                                cardLocations.map(locationObj => {
                                    var sensor = locationObj.sensor;
                                    if(sensors.filter(x => x.sensor_id == locationObj.sensor)[0])
                                        sensor = sensors.filter(x => x.sensor_id == locationObj.sensor)[0].sensor_name
                                    var card = locationObj.card
                                    if (cards.filter(x => x.id == locationObj.card)[0]) 
                                        card = cards.filter(x => x.id == locationObj.card)[0].name
                                    return (
                                        <tr key={locationObj.card}>
                                            <td>{sensor}</td>
                                            <td>{card}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
