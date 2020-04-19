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
                <section className="section">
                    <div className="columns is-centered">
                        <div className="column is-narrow">
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th title="Beacon">Card Name</th>
                                        <th title="Beacon">Card ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cards &&
                                        cards.map(card => {
                                            return (
                                                <tr key={card.id}>
                                                    <th>{card.name}</th>
                                                    <td>{card.id}</td>
                                                </tr>
                                            );
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>


            );
        }
    }
}

export default BeaconList;
