import React, {Component} from 'react';

class Hardware extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            room_name: this.props.room_name,
            health: this.props.health,
            status: this.props.status,
            age: this.props.age
        }
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <tr>
                    <th>{this.state.id}</th>
                    <td>{this.state.room_name}</td>
                    <td>{this.state.health}</td>
                    <td>{this.state.status}</td>
                    <td>{this.state.age}</td>
                </tr>
            </div>
        );
    }
}

export default Hardware;