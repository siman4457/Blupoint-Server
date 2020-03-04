import React, { useEffect, useState } from "react";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Dashboard = ({ location }) => {
  const ENDPOINT = "localhost:5000";
  const [user, setUser] = useState("");

  useEffect(() => {
    //Runs when the component renders
    const { user } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setUser(user);

    console.log("user:", user);
    console.log("socket:", socket);
  }, [ENDPOINT, location.search]);
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
