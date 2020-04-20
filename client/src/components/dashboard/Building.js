import React, { Component } from 'react'
import Room from './Room'
import axios from 'axios'
export default class Building extends Component {
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
                }
            )
        const interval = setInterval(() => {
            axios.get('/api/get_card_locations')
                .then(
                    (response) => {

                        this.setState({
                            cardLocations: response.data,
                            isLoaded: true
                        })
                    }
                )
        }, 2000);
    }

    render() {
        const rooms = this.props.building.rooms;
        const building_width = this.props.building.building_width;
        const building_length = this.props.building.building_length;
        const { cardLocations, error, isLoaded } = this.state;

        let building_container = {
            width: '100%',
            height: '100%',
            margin: 0,
            padding: 0,
            position: 'relative'
        }

        if (error) {
            return (
                <div>Error: {error.message}</div>
            )
        }
        else if (!isLoaded) {
            return (
                <div>Loading...</div>
            )
        }
        else {
            return (
                <div style={building_container}>
                    {rooms &&
                        rooms.map(room => {
                            return (
                                <Room room={room} sensors={room.sensors} cardLocations={cardLocations} scalex={100/building_width} scaley={100/building_length} />
                            );
                        })}
                </div>
            )
        }
    }
}
