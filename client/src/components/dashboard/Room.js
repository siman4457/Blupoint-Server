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
        const room_id = room.room_id

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
        const { scalex } = this.props
        const { scaley } = this.props
        const { cardLocations } = this.props
        let room_styles = {
            width: (Math.floor(room.room_width*scalex)).toString() + '%',
            height: (Math.floor(room.room_length*scaley)).toString() + '%',
            left: (Math.floor(room.room_x*scalex)) + '%',
            top: (Math.floor(room.room_y*scaley)) + '%',
            backgroundColor: '#3660BF', //Needs to be blue when occupued and white when empty
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'black',
            position: 'absolute',
            display: 'inlineBlock'
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
                    <p className="room-title has-text-centered title is-6 has-text-white">{room.room_name}</p>
                    {sensors &&
                        sensors.map(sensor => {
                            const connectedCards = cardLocations.filter(x => x.sensor == sensor.sensor_id).map(x => x.card);
                            console.log("sensor " + sensor.sensor_id + " is connected to cards:", connectedCards)
                            let x = sensor.sensor_x.toString() + '%';
                            let y = sensor.sensor_y.toString() + '%';
                            let sensor_style = {
                                position: 'absolute',
                                //display: 'inlineBlock',
                                left: x,
                                top: y
                            }
                            console.log(sensor_style)

                            return (
                                <Sensor style={sensor_style} sensorId={sensor.sensor_name} connectedCards={connectedCards} />
                            );
                        })}
                </div>
            )
        }
    }
}
