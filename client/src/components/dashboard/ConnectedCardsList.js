import React, { Component } from 'react'

export default class ConnectedCardsList extends Component {
    render() {
        const { connectedCards } = this.props
        return (
            <div>
                {connectedCards &&
                    connectedCards.map(card => {
                        return (
                            <p className="has-text-white">{card}</p>
                        );
                    })}

            </div>
        )
    }
}
