import React, { useEffect, useState } from "react";
import queryString from "query-string";
// import io from "socket.io-client";
// import FormModal from "./FormModal";
import UseModal from "./UseModal";
import Sensors from "../sensors/Sensors";
import { Link } from "react-router-dom";

// let socket;
const Config = location => {
  const ENDPOINT = "localhost:5000";
  const [user, setUser] = useState("");
  const [modalType, setType] = useState("");

  // const { isShowing, toggle_modal } = UseModal(modalType);

  //Runs when the component renders
  useEffect(() => {
    const { user } = queryString.parse(location.search); //Parse user from url
    setUser(user);

    const type = ""
    setType(type);

    // socket = io(ENDPOINT);

    //complete useEffect with a return. This happens on unmounting of this component.
    // return () => {
    //   socket.emit("disconnect");

    //   socket.off(); //This turns off a specific instance of the socket.
    // };
  }, [ENDPOINT, location.search]);

  return (
    <div className="container">
      <div className="columns">
        <div className="column"></div>
        <div className="column is-one-third is-centered">
          <Link to="/addsensor" className="button is-success">
            Add a new sensor
          </Link>
          <br />
          <br />
          <Link to="/removesensor" className="button is-success">
            Remove a sensor
          </Link>
          <br />
          <br />

          <Link to="/addidcard" className="button is-success">
            Add an ID card
          </Link>
          <br />
          <br />

          <Link to="/removeidcard" className="button is-success">
            Remove an ID card
          </Link>
          <br />
          <br />

          <h1>Current Sensors and ID Cards:</h1>
          <Sensors />
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default Config;
