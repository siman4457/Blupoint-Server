// import React, { useEffect, useState } from "react";

// import queryString from "query-string";
// import io from "socket.io-client";
// import FormModal from "./FormModal";
// import UseModal from "./UseModal";
import React from 'react'
import { Link } from "react-router-dom";
import CardList from "../hardware/CardList"
import BuildingList from "../hardware/BuildingList"
import "./config.css";
import SensorList from '../hardware/SensorList';


const Config = location => {

  return (
    <div className="container">
      <div className="columns">
        <div className="column is-centered">
          <div className="row-container">
            <Link to="/addsensor" className="button lt-button config-control">
              Add a new sensor
           </Link>

            <Link to="/removesensor" className="button lt-button config-control">
              Remove a sensor
            </Link>

            <Link to="/addidcard" className="button lt-button config-control">
              Add an ID card
            </Link>

            <Link to="/removeidcard" className="button lt-button config-control">
              Remove an ID card
            </Link>
            <Link to="/addbuilding" className="button lt-button config-control">
              Add a new building
            </Link>
            <Link to="/removebuilding" className="button lt-button config-control">
              Remove a building
            </Link>
          </div>
          <SensorList />
          <CardList />
          <BuildingList />
        </div>
      </div>
    </div>
  );
};

export default Config;
