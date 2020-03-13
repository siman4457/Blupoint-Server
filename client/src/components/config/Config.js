import React, { useEffect, useState } from "react";
import queryString from "query-string";
// import io from "socket.io-client";
import AddSensorModal from "./AddSensorModal";
import UseModal from "./UseModal";
import Sensors from "../sensors/Sensors";

// let socket;
const Config = location => {
  const ENDPOINT = "localhost:5000";
  const [user, setUser] = useState("");
  const { isShowing, toggle_modal } = UseModal();

  //Runs when the component renders
  useEffect(() => {
    const { user } = queryString.parse(location.search); //Parse user from url
    setUser(user);

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
          <span className="button is-success" onClick={toggle_modal}>
            Add a new sensor
          </span>
          <AddSensorModal show={isShowing} hide={toggle_modal} />
          <br />
          <span className="button is-success" onClick={toggle_modal}>
            Remove a sensor
          </span>

          <Sensors />
        </div>
        <div className="column"></div>
      </div>
    </div>
  );
};

export default Config;
