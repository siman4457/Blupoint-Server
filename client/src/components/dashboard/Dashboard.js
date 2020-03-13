import React, { useEffect, useState } from "react";
import queryString from "query-string";
// import io from "socket.io-client";

let socket;

const Dashboard = ({ location }) => {
  const ENDPOINT = "localhost:5000";
  const [user, setUser] = useState("");

  useEffect(() => {
    //Runs when the component renders
    const { user } = queryString.parse(location.search);

    // socket = io(ENDPOINT);

    setUser(user);

    // socket.emit("get_location_data", { user });

    //complete useEffect with a return. This happens on unmounting of this component.
    // return () => {
    //   socket.emit("disconnect");

    //   socket.off(); //This turns off a specific instance of the socket.
    // };
  }, [ENDPOINT, location.search]);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
