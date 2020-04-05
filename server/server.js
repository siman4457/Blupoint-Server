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
  //Data received from the front end will be the following format:
  // { sensorName: 'test', macAddress: 'test' }

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});
app.post("/api/remove_sensor", (req, res) => {
  console.log("----------Removing Sensor---------------");
  //Data received from the front end will be the following format:
  // { sensorName: 'test', macAddress: 'test' }

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});


app.post("/api/create_id_card", (req, res) => {
  console.log("----------Creating ID Card---------------");
  //Data received from the front end will be the following format:
  //{ employeeName: 'test', idCardNumber: 'test' }

  const { sensorName } = req.body;
  const { macAddress } = req.body;
  console.log(req.body);
  // res.send("response from the database");

});
app.post("/api/remove_id_card", (req, res) => {
  console.log("----------Removing ID Card---------------");
  //Data received from the front end will be the following format:
  //{ employeeName: 'test', idCardNumber: 'test' }

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


//elasticsearch functions
/*
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://10.0.0.233:9200' })


//queries for cards and sensors
//_id for record id and _source for record fields
const sensors = (await client.search({
    index: 'blupoint_sensors',
    size: 10000,
    body: { 
        "query": {
            "match_all": {}
        } 
    }
  })).body.hits.hits;

const cards = (await client.search({
    index: 'blupoint_cards',
    size: 10000,
    body: { 
        "query": {
            "match_all": {}
        } 
    }
  })).body.hits.hits;

//insert card
await client.index({
    index: 'blupoint_cards',
    refresh: true,
    body: null //put js object here with needed fields
})

//insert sensor
await client.index({
    index: 'blupoint_sensors',
    refresh: true,
    body: null //put js object here with needed fields
})

//update sensor
await client.update({
    index: 'blupoint_sensors',
    refresh: true,
    id: null, //put _id from queried object here
    body: null //put js object here with needed fields
})

//update card
await client.update({
    index: 'blupoint_cards',
    refresh: true,
    id: null, //put _id from queried object here
    body: null //put js object here with needed fields
})

//delete sensor
await client.delete({
    index: 'blupoint_sensors',
    refresh: true,
    id: null, //put _id from queried object here
})

//delete card
await client.update({
    index: 'blupoint_cards',
    refresh: true,
    id: null, //put _id from queried object here
})
*/

//sensor handler
/*
var io = require('socket.io')
var server = io.listen(27015);

var locations = {
  1: [ 0, 0],
  2: [10, 0],
  3: [10,10]
}

var rssi = {
  1: {},
  2: {},
  3: {}
}

server.on('connection', function (socket) {
  //socket.on('indetify', function(from, msg) {
  //  sensorLookup[from] = msg.id
  //})
  console.log('connection')

  socket.on('location', function (from) {
    rssi[from.id][from.card] = {
      rssi: from.rssi, 
      time: new Date() 
    } 
  })

  socket.on('disconnect', function () {
  })
})

function runLoc(){
  var cards = [];
  for (var n = 1; n < 4; n++) {
    for (var i in Object.keys(rssi[n])) {
      if (!(i in cards)) {
        cards.push(Object.keys(rssi[n])[i])
      }
    }
  }
  for (var c in cards) {
    var card = cards[c]
    var max = null;
    var maxV = null;
    var currDate = new Date();
    for (var s in rssi) {
      if (rssi[s][card] && rssi[s][card]['time'] && (((currDate.getTime() - rssi[s][card]['time'].getTime())/1000) < 3) && (maxV == null || rssi[s][card]['rssi'] > maxV)) {
        max = 3;
        maxV = rssi[3][card]['rssi'];
      }
    }
    if (max != null) {
      await esClient.index({
        index: 'blupoint_history',
        body: {
          card: card,
          sensor: max,
          time: new Date()
        }
      });
    }
  }
  setTimeout(runLoc, 5000);
}
runLoc();
*/