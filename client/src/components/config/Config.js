// import React, { useEffect, useState } from "react";

// import queryString from "query-string";
// import io from "socket.io-client";
// import FormModal from "./FormModal";
// import UseModal from "./UseModal";
import React from 'react'
import { Link } from "react-router-dom";
import Sensors from "../hardware/Sensors";
import Beacons from "../hardware/Beacons"
import "./config.css";

// let socket;
const Config = location => {
  // const ENDPOINT = "localhost:5000";
  // const [user, setUser] = useState("");
  // const [modalType, setType] = useState("");

  // const { isShowing, toggle_modal } = UseModal(modalType);

  //Runs when the component renders
  // useEffect(() => {
  //   const { user } = queryString.parse(location.search); //Parse user from url
  //   setUser(user);

  //   const type = ""
  //   setType(type);

  //   // socket = io(ENDPOINT);

  //   //complete useEffect with a return. This happens on unmounting of this component.
  //   // return () => {
  //   //   socket.emit("disconnect");

  //   //   socket.off(); //This turns off a specific instance of the socket.
  //   // };
  // }, [ENDPOINT, location.search]);

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
          </div>
          <Sensors />
          <Beacons />
        </div>
      </div>
    </div>
  );
};

export default Config;
