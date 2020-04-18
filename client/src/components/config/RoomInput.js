import React, { Component } from 'react'

export default class RoomInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        };

    }

    addRow() {
        let rooms = this.state.rooms
        rooms.push('test')
        this.setState({ rooms: rooms })
    }

    render() {
        const { rooms } = this.state
        return (
            <div>
                <table>
                    {rooms && rooms.map((r) => (
                        <tr>
                            <td>{r}</td>
                        </tr>
                    ))}
                </table>
                <button id="addBtn" onClick={this.addRow}>ADD</button>
            </div>
        )
    }
}
