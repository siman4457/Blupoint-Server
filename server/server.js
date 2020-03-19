const express = require("express");
const app = express();
const path = require("path");
// const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');

// const app = require("express")();
// const server = require("http").Server(app);
// const io = require("socket.io")(server);

// const testAPIRouter = require("./routes/testAPI");

// const router = require("./router");
// app.use(router);
// app.use(express.static(path.join(__dirname, "../client/public")));

// app.use(history());
app.use(express.static('dist'));
app.use(bodyParser.json());

// REST
app.get("/api/get_sensors", (req, res) => {
  const sensors = [
    { id: 1, name: "sensor1", macAddress: "123456" },
    { id: 2, name: "sensor2", macAddress: "265416" },
    { id: 3, name: "sensor3", macAddress: "348654" }
  ];
  res.json(sensors);
});

app.post("/api/create_sensor", (req, res) => {
  console.log("----------Creating Sensor---------------");

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});
app.post("/api/remove_sensor", (req, res) => {
  console.log("----------Removing Sensor---------------");

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});


app.post("/api/create_id_card", (req, res) => {
  console.log("----------Creating ID Card---------------");

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});
app.post("/api/remove_id_card", (req, res) => {
  console.log("----------Removing ID Card---------------");

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});




// app.use("/testAPI", testAPIRouter);

// app.post("/createSensor", (req, res) => {
//   console.log("Creating sensor");
//   let sensorName = req.body.sensorName;
//   let sensorMacAddress = req.body.sensorMacAddress;

//   //Add validation for create data
//   console.log(
//     "Sensor " +
//       sensorName +
//       " was created with a mac address of " +
//       sensorMacAddress
//   );
// });

// SOCKETS
// io.on("connection", socket => {
//   console.log("We have a new connection!");

//   socket.on("add_sensor", ({ user }) => {
//     console.log("Adding sensor for " + user);
//   });

//   socket.on("remove_sensor", ({ sensor_id, user }) => {
//     console.log("Removing sensor " + sensor_id + " from " + user);
//   });

//   socket.on("disconnect", () => {
//     console.log("User has left.");
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
