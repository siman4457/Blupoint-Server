import React, { useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";

const Dashboard = ({ location }) => {
  useEffect(() => {
    //Runs when the component renders
    const data = queryString.parse(location.search);
    console.log("------------------");
    console.log("data:", data);
    console.log("------------------");
  });
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
