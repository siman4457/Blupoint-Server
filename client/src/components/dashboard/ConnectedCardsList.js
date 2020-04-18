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
        axios.get('/api/get_card_locations')
            .then(
                (response) => {
                    this.setState({
                        cardLocations: response.data,
                        isLoaded: true
                    })
                })
    }

    render() {
        const { cardLocations } = this.state

        const sidebar_styling = {
            height: '100%',
            minHeight: '100%',
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
                                    return (
                                        <tr key={locationObj.cardId}>
                                            <td>{locationObj.sensorId}</td>
                                            <td>{locationObj.cardId}</td>
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
