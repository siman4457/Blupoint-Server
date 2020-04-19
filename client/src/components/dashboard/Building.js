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
    }

    render() {
        const rooms = this.props.building.rooms;
        const width = this.props.building.width;
        const height = this.props.building.height;
        const { cardLocations, error, isLoaded } = this.state;
        console.log()

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
                <div>
                    {rooms &&
                        rooms.map(room => {
                            return (
                                <div key={room.id}>
                                    <Room room={room} sensors={room.sensors} cardLocations={cardLocations} scalex={500/width} scaley={500/height} />
                                </div>
                            );
                        })}
                </div>
            )
        }
    }
}
