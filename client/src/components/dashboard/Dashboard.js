import React from 'react'
import Map from './Map'
import ConnectedCardsList from './ConnectedCardsList'

const Dashboard = () => {
  return (
    <div className="columns is-gapless">
      <div className="column is-one-third">
        <ConnectedCardsList />

      </div>
      <div className="column is-two-thirds">
        <Map></Map>
      </div>
    </div>
  );
};

export default Dashboard;
