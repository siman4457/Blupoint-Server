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
        console.log(cardLocations)
        let room_styles = {
            width:  (Math.floor(room.width*scalex)).toString() + 'px',
            height: (Math.floor(room.height*scaley)).toString() + 'px',
            left: (Math.floor(room.x*scalex)).toString() + 'px',
            top: (Math.floor(room.y*scaley)).toString() + 'px',
            backgroundColor: '#3660BF', //Needs to be blue when occupued and white when empty
            borderStyle: 'solid',
            borderWidth: '2px',
            borderColor: 'black',
            position: 'absolute'
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
                            let x = sensor.sensor_x.toString() + 'px';
                            let y = sensor.sensor_y.toString() + 'px';
                            let sensor_style = {
                                position: 'absolute',
                                left: x,
                                top: y
                            }
                            return (
                                <div key={sensor.sensor_id}>
                                    <Sensor style={sensor_style} sensorId={sensor.id} connectedCards={connectedCards} />
                                </div>
                            );
                        })}
                </div>
            )
        }
    }
}
