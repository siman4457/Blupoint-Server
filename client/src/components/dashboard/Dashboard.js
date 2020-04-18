import React from 'react'
import Map from './Map'

const Dashboard = () => {
  return (
    <div>
      <div className="columns">
        <div className="column is-one-third">
          {/* <SensorStatus /> */}

        </div>
        <div className="column is-two-thirds">
          <Map></Map>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
