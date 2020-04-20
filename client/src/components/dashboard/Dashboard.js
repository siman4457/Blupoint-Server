import React from 'react'
import Map from './Map'
import ConnectedCardsList from './ConnectedCardsList'
import "./Dashboard.css";
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
  const ConnectedCardsListStyle = {
    maxWidth: '300px'
  }
  const MapStyle = {
    maxWidth: '300px'
  }
  return (
    <div className="dashboard-container" >
      <div className="columns is-gapless" style={{display: 'flex', flexDirection: 'row'}}>
        <div className="column is-one-third" style={ConnectedCardsListStyle}>
          <ConnectedCardsList />

        </div>
        <div className="column is-two-thirds" style={{flexGrow: 1, height: '100%'}}>
          <br />
          <Map style={{height: '900px'}}></Map>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
