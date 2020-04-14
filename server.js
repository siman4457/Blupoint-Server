const express = require("express");
const app = express();
const path = require("path");
// const history = require('connect-history-api-fallback');
const bodyParser = require('body-parser');

const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://10.0.0.233:9200' })


app.use(express.static('dist'));
app.use(bodyParser.json());


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
  const { senseId } = req.body;
  console.log(req.body)

  //insert sensor
  // await esClient.index({
  //   index: 'blupoint_sensors',
  //   refresh: true,
  //   body: req.body //put js object here with needed fields
  // })

  return res.status(200).send({
    message: `POST create_sensor succeeded`
  })

});


app.post("/api/remove_sensor", (req, res) => {
  console.log("----------Removing Sensor---------------");

  // const { sensorName } = req.body;

  const { sensorId } = req.body;
  console.log(req.body);

  //delete sensor
  // await esClient.delete({
  //   index: 'blupoint_sensors',
  //   refresh: true,
  //   id: sensorId, //put _id from queried object here
  // })

  return res.status(200).send({
    message: `POST remove_sensor succeeded`
  })

});


app.post("/api/create_id_card", (req, res) => {
  console.log("----------Creating ID Card---------------");

  const { itemName } = req.body;
  const { idCardID } = req.body;
  console.log(req.body);

  //insert card
  // await esClient.index({
  //   index: 'blupoint_cards',
  //   refresh: true,
  //   body: req.body
  // })

  return res.status(200).send({
    message: `POST create_id_card succeeded`
  })

});
app.post("/api/remove_id_card", (req, res) => {
  console.log("----------Removing ID Card---------------");

  const { idCardID } = req.body
  console.log(req.body);

  //delete card
  // await esClient.update({
  //   index: 'blupoint_cards',
  //   refresh: true,
  //   id: idCardID, //put _id from queried object here
  // })


  return res.status(200).send({
    message: `POST remove_id_card succeeded`
  })

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


//-----------------elasticsearch functions-----------------
/*
const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://10.0.0.233:9200' })


//queries for cards and sensors
//_id for record id and _source for record fields
const sensors = (await esClient.search({
    index: 'blupoint_sensors',
    size: 10000,
    body: {
        "query": {
            "match_all": {}
        }
    }
  })).body.hits.hits;

const cards = (await esClient.search({
    index: 'blupoint_cards',
    size: 10000,
    body: {
        "query": {
            "match_all": {}
        }
    }
  })).body.hits.hits;

//insert card
await esClient.index({
    index: 'blupoint_cards',
    refresh: true,
    body: null //put js object here with needed fields
})

//insert sensor
await esClient.index({
    index: 'blupoint_sensors',
    refresh: true,
    body: null //put js object here with needed fields
})

//update sensor
await esClient.update({
    index: 'blupoint_sensors',
    refresh: true,
    id: null, //put _id from queried object here
    body: null //put js object here with needed fields
})

//update card
await esClient.update({
    index: 'blupoint_cards',
    refresh: true,
    id: null, //put _id from queried object here
    body: null //put js object here with needed fields
})

//delete sensor
await esClient.delete({
    index: 'blupoint_sensors',
    refresh: true,
    id: null, //put _id from queried object here
})

//delete card
await esClient.update({
    index: 'blupoint_cards',
    refresh: true,
    id: null, //put _id from queried object here
})


//get most recents
var currentPositions = await esClient.search({
  "index": 'blupoint_history',
  "query": {
    "match_all": {}
  },
  "collapse": {
    "field": "card",
    "inner_hits": {
      "name": "most_recent",
      "size": 1,
      "sort": [{"time": "desc"}]
    }
  }
}).hits.hits
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
          time: (new Date()).getTime()
        }
      });
    }
  }
  setTimeout(runLoc, 5000);
}
runLoc();
*/