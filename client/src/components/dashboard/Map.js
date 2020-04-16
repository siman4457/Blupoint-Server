import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Building from './Building';

export default class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            buildings: [],
            isLoaded: false,
            currentBuilding: [],
        };
    }

    componentDidMount() {
        fetch('/api/get_buildings')
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        buildings: result,
                        currentBuilding: result[0]
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                });
    }

    handleNext() {
        const cur_index = this.state.buildings.indexOf(this.state.currentBuilding);
        let next = null
        if (cur_index >= 0 && cur_index < this.state.buildings.length - 1) {
            next = this.state.buildings[cur_index + 1]
            this.setState({
                currentBuilding: next
            });
        }
    };

    handlePrevious() {
        const cur_index = this.state.buildings.indexOf(this.state.currentBuilding);
        let next = null
        if (cur_index > 0 && cur_index <= this.state.buildings.length - 1) {
            next = this.state.buildings[cur_index - 1]
            this.setState({
                currentBuilding: next
            });
        }
    };



    render() {
        const { error, isLoaded, buildings } = this.state;
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
        else if (buildings.length > 0) {

            // let building_container = {
            //     width: this.state.currentBuilding.width.toString() + 'px',
            //     height: this.state.currentBuilding.height.toString() + 'px',
            // }
            let building_container = {
                width: "500px",
                height: "500px"
            }

            return (
                <div>
                    <h1 className="has-text-centered title is-1">{this.state.currentBuilding.name}</h1>
                    <div className="level">
                        <div className="level-item has-text-centered">
                            <button className="button is-success" onClick={this.handlePrevious.bind(this)}>
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </button>
                        </div>

                        <div className="level-item has-text-centered">
                            <div className="room-container" style={building_container}>
                                <Building rooms={this.state.currentBuilding.rooms} />
                            </div>
                        </div>

                        <div className="level-item has-text-centered">
                            <button className="button is-success" onClick={this.handleNext.bind(this)}>
                                <FontAwesomeIcon icon={faArrowRight} />
                            </button>
                        </div>

                    </div>
                </div >
            )
        }
        else if (buildings.length <= 0) {
            return (
                <div>
                    <br />
                    <h2>
                        Whoops! Looks like you dont have any buildings set up yet.
                    Please set up a building at <Link to="/config">Configuration</Link>.
                    </h2>
                </div>
            )
        }
        else {
            return (
                <div>
                    <br />
                    <h2>Whoops! Something went wrong when trying to load your building. Please contact the Blupoint team.</h2>
                </div>
            )
        }
    }
}
