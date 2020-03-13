const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("testAPI is up and running.");
});

router.post("/createSensor", (req, res) => {
  console.log("Creating sensor");
  let sensorName = req.body.sensorName;
  let sensorMacAddress = req.body.sensorMacAddress;

  //Add validation for create data
  console.log(
    "Sensor " +
      sensorName +
      " was created with a mac address of " +
      sensorMacAddress
  );
});

module.exports = router;
