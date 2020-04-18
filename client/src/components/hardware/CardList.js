import React, { Component } from "react";

class BeaconList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            cards: [],
            isLoaded: false
        };
    }

    componentDidMount() {
        fetch('/api/get_cards')
            .then(res => res.json())
            .then(
                (result) => {

                    this.setState({
                        isLoaded: true,
                        cards: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    render() {
        const { error, isLoaded, cards } = this.state;
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

                <div className="container">
                    <section className="section">
                        <div className="columns is-centered">
                            <div className="column is-narrow">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th title="Beacon">Card ID</th>
                                            <th title="Health">Health</th>
                                            <th title="Status">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cards &&
                                            cards.map(card => {
                                                return (
                                                    <tr key={card.id}>
                                                        <th>{card.id}</th>
                                                        <td>{card.health}</td>
                                                        <td>{card.status}</td>
                                                    </tr>
                                                );
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </section>
                </div>

            );
        }
    }
}

export default BeaconList;
