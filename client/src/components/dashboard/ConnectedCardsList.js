import React, { Component } from 'react'

export default class ConnectedCardsList extends Component {
    render() {
        const { connectedCards } = this.props
        return (
            <div>
                {connectedCards &&
                    connectedCards.map(cardId => {
                        return (
                            <p className="has-text-white id-card-label" key={cardId}>{cardId}</p>

                        );
                    })}


            </div>
        )
    }
}
