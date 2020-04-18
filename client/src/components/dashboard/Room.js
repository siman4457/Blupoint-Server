import React, { Component } from 'react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faAtom } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import Sensor from './Sensor';

export default class Room extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            sensors: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        const { room } = this.props;
        const room_id = room.id

        axios.get('/api/get_sensors_by_room', { params: { room_id: room_id } }).then(
            (response) => {
                this.setState({
                    sensors: response.data,
                    isLoaded: true
                })
            }
        )


    }

    render() {
        const { sensors, error, isLoaded } = this.state
        const { room } = this.props
        const { cardLocations } = this.props

        let room_styles = {
            width: room.width.toString() + 'px',
            height: room.height.toString() + 'px',
            backgroundColor: '#3660BF', //Needs to be blue when occupued and white when empty
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'black',
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
                <div style={room_styles}>
                    <p className="room-title has-text-centered title is-6 has-text-white">{room.name}</p>
                    {sensors &&
                        sensors.map(sensor => {
                            const connectedCards = cardLocations.filter(x => x.sensorId == sensor.id).map(x => x.cardId); //MIGHT NEED TO BE == instead of ===

                            console.log("sensor " + sensor.id + " is connected to cards:", connectedCards)

                            let x = sensor.x.toString() + 'px';
                            let y = sensor.y.toString() + 'px';
                            let sensor_style = {
                                position: 'absolute',
                                left: x,
                                top: y
                            }
                            return (
                                <div key={sensor.id}>
                                    <Sensor style={sensor_style} connectedCards={connectedCards} />
                                </div>
                            );
                        })}
                </div>
            )
        }
    }
}
