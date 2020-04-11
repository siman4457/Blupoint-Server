import React, { Component } from 'react'
import styles from './Dashboard.css'
import Room from './Room'
import config from './config'

export default class Map extends Component {
    constructor(props) {
        super(props);

        // let sensor1 = {
        //     'id':1,
        //     'connectedCards':['card1', 'card2'],
        //     'status': 'online',
        //     'room': 1,
        //     'xPosition': 5,
        //     'yPosition': 5
        // }
        // let sensor2 = {
        //     'id':2,
        //     'connectedCards':['card3', 'card4'],
        //     'status': 'online',
        //     'room': 2,
        //     'xPosition': 5,
        //     'yPosition': 5
        // }

        // let room1 = {
        //     'id':1,
        //     'length': 10,
        //     'width':10
        // }
        // let room2 = {
        //     'id':1,
        //     'length': 10,
        //     'width':10
        // }

        // let building1 = {
        //     'id':1,
        //     'sensors': [sensor1, sensor2],
        //     'rooms': [room1, room2]
        // }

        // this.state = {
        //     'building': building1,
        // };

        //Example json file
        // this.state = {
        //     building_name: "building1",
        //     num_rooms: 4,
        //     room1_x: 100,
        //     room1_y: 100,
        //     num_sensors_room1: 1,
        //     sensor1_room1_x: 50,
        //     sensor1_room1_y: 50,
        //     room1_color: 'red',


        //     room2_x: 100,
        //     room2_y: 100,

        //     room3_x: 100,
        //     room3_y: 100,

        //     room4_x: 100,
        //     room4_y: 100,
        // }

    }

    render() {
        let style = Object.assign({},
            styles
        );

        let { buildings } = config
        let building1 = buildings[0]
        let rooms = building1.rooms;

        return (
            <div>
                <h1 className="has-text-centered title is-1">{building1.name}</h1>
                <div className="room-container">


                    {rooms &&
                        rooms.map(room => {

                            return (
                                <div>
                                    <Room key={room.id} room={room} />
                                </div>
                            );
                        })}
                </div>
            </div>
        )
    }
}
