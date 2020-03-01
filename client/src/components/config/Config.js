import React, { Component } from "react";

class Config extends Component {
  render() {
    return (
      <div className="container">
        <div className="columns">
          <div className="column is-one-third is-centered">
            <span>
              <strong>Add a new device</strong>
              <span className="button is-success">+</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Config;
