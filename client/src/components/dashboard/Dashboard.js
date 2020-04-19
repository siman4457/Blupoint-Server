import React from 'react'
import Map from './Map'
import ConnectedCardsList from './ConnectedCardsList'
import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container" >
      <div className="columns is-gapless">
        <div className="column is-one-third">
          <ConnectedCardsList />

        </div>
        <div className="column is-two-thirds">
          <br />
          <Map></Map>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
