import React, { Component } from 'react'
import styles from './Dashboard.css'
import Room from './Room'
import config from './config'

export default class Map extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { buildings } = config
        let building1 = buildings[0]
        let rooms = building1.rooms;

        let building_container = {
            width: building1.width.toString() + 'px',
            height: building1.height.toString() + 'px',
        }

        return (
            <div>
                <h1 className="has-text-centered title is-1">{building1.name}</h1>
                <div className="room-container" style={building_container}>
                    {rooms &&
                        rooms.map(room => {

                            return (
                                <div>
                                    <Room key={room.id} room={room} sensors={room.sensors} />
                                </div>
                            );
                        })}
                </div>
            </div >
        )
    }
}
