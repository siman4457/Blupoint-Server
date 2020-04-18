import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

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
        const { room } = this.props
        const { sensors, error, isLoaded } = this.state

        let room_styles = {
            width: room.width.toString() + 'px',
            height: room.height.toString() + 'px',
            backgroundColor: 'blue', //Needs to be blue when occupued and white when empty
            borderStyle: 'solid',
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
            console.log("testing room", room)
            console.log('testing sensors', sensors)
            return (
                <div style={room_styles}>
                    <p className="has-text-centered">{room.name}</p>
                    {sensors &&
                        sensors.map(sensor => {
                            let x = sensor.x.toString() + 'px';
                            let y = sensor.y.toString() + 'px';
                            let sensor_style = {
                                position: 'absolute',
                                left: x,
                                top: y
                            }
                            return (
                                <FontAwesomeIcon key={sensor.id} icon={faAtom} style={sensor_style} />
                            );
                        })}
                </div>
            )
        }
    }
}
