import React, { Component } from 'react'

export default class Room extends Component {

    render() {
        let styles = {
            width: '100px',
            height: '100px',
            backgroundColor: 'blue',
            borderStyle: 'solid',


        }

        const { room } = this.props
        return (
            <div style={styles}>
                <p className="has-text-centered">{room.name}</p>
            </div>
        )
    }
}
