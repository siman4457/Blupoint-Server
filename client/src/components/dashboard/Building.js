import React, { Component } from 'react'
import Room from './Room'

export default class Building extends Component {
    render() {
        const { rooms } = this.props
        return (
            <div>
                {rooms &&
                    rooms.map(room => {
                        return (
                            <div key={room.id}>
                                <Room room={room} sensors={room.sensors} />
                            </div>
                        );
                    })}
            </div>
        )
    }
}
