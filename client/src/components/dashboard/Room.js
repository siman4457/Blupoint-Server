import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons'



export default class Room extends Component {

    render() {
        const { room } = this.props
        const { sensors } = this.props

        let room_styles = {
            width: room.width.toString() + 'px',
            height: room.height.toString() + 'px',
            backgroundColor: 'blue', //Needs to be blue when occupued and white when empty
            borderStyle: 'solid',
            position: 'relative'
        }


        //Atom icon symbolizes sensor
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
                            <FontAwesomeIcon icon={faAtom} style={sensor_style} />

                        );
                    })}



            </div>
        )
    }
}
