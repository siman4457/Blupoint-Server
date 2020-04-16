const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://10.0.0.233:9200' })

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.get("/api/get_buildings", async function (req, res) {
  //TODO: build query to construct a list of buildings in the following format:
  const buildings = [
    {
      "id": 1,
      "name": "Building 1",
      "width": 400,
      "height": 500,
      "rooms": [
        {
          "id": 1,
          "name": "Kitchen",
          "width": 200,
          "height": 200,
          "sensors": [
            {
              "id": "dq231",
              "x": 70,
              "y": 90
            },
            {
              "id": "1sfd2",
              "x": 110,
              "y": 90
            }
          ]
        },
        {
          "id": 2,
          "name": "Bathroom",
          "width": 100,
          "height": 50
        },
        {
          "id": 3,
          "name": "Lobby",
          "width": 100,
          "height": 100,
          "sensors": [
            {
              "id": "dq231",
              "x": 40,
              "y": 50
            }
          ]
        }
      ]
    },
    {
      "id": 2,
      "name": "Building 2",
      "width": 300,
      "height": 300,
      "rooms": [
        {
          "id": 1,
          "name": "Kitchen",
          "width": 100,
          "height": 100,
          "sensors": [
            {
              "id": "dq231",
              "x": 70,
              "y": 90
            },
            {
              "id": "1sfd2",
              "x": 110,
              "y": 90
            }
          ]
        },
        {
          "id": 2,
          "name": "Bathroom",
          "width": 100,
          "height": 50
        },
        {
          "id": 3,
          "name": "Lobby",
          "width": 100,
          "height": 100,
          "sensors": [
            {
              "id": "dq231",
              "x": 40,
              "y": 50
            }
          ]
        }
      ]
    }
  ]

  console.log(buildings)
  res.json(buildings)
});


app.get("/api/get_sensors", async function (req, res) {
  // const sensors = (await esClient.search({
  //   index: 'blupoint_sensors',
  //   size: 10000,
  //   body: {
  //     "query": {
  //       "match_all": {}
  //     }
  //   }
  // })).body.hits.hits.map(function (i) {
  //   return i['_source'];
  // });

  const sensors = [
    { id: 1, name: "sensor1", macAddress: "123456" },
    { id: 2, name: "sensor2", macAddress: "265416" },
    { id: 3, name: "sensor3", macAddress: "348654" }
  ];
  console.log(sensors)
  res.json(sensors);
});

app.post("/api/create_sensor", async function (req, res) {
  console.log("----------Creating Sensor---------------");


  const { sensorName } = req.body;
  const { sensorId } = req.body;
  console.log(req.body)

  await esClient.index({
    index: 'blupoint_sensors',
    refresh: true,
    body: req.body, //put js object here with needed fields
    id: sensorId
  })

  return res.status(200).send({
    message: `POST create_sensor succeeded`
  })

});

app.post("/api/remove_sensor", async function (req, res) {
  console.log("----------Removing Sensor---------------");

  const { sensorId } = req.body;
  console.log(req.body);

  await esClient.delete({
    index: 'blupoint_sensors',
    refresh: true,
    id: sensorId,
  })

  return res.status(200).send({
    message: `POST remove_sensor succeeded`
  })

});

app.get("/api/get_cards", async function (req, res) {
  const cards = (await esClient.search({
    index: 'blupoint_cards',
    size: 10000,
    body: {
      "query": {
        "match_all": {}
      }
    }
  })).body.hits.hits.map(function (i) {
    return i['_source'];
  });
  console.log(cards)
  res.json(sensors);
});

app.post("/api/create_id_card", async function (req, res) {
  console.log("----------Creating ID Card---------------");

  const { itemName } = req.body;
  const { idCardID } = req.body;
  console.log(req.body);

  await esClient.index({
    index: 'blupoint_cards',
    refresh: true,
    body: req.body,
    id: idCardID
  })

  return res.status(200).send({
    message: `POST create_id_card succeeded`
  })

});

app.post("/api/remove_id_card", async function (req, res) {
  console.log("----------Removing ID Card---------------");

  const { idCardID } = req.body
  console.log(req.body);

  await esClient.update({
    index: 'blupoint_cards',
    refresh: true,
    id: idCardID,
  })


  return res.status(200).send({
    message: `POST remove_id_card succeeded`
  })

});

app.get("/api/get_card_locations", async function (req, res) {
  console.log("----------Removing ID Card---------------");

  res.json(await esClient.search({
    "index": 'blupoint_history',
    "query": {
      "match_all": {}
    },
    "collapse": {
      "field": "card",
      "inner_hits": {
        "name": "most_recent",
        "size": 1,
        "sort": [{ "time": "desc" }]
      }
    }
  }).body.hits.hits.map(function (i) {
    return i['_source'];
  }));
});


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


//-----------------sensor sockets-----------------

//sensor handler
var io = require('socket.io');
var server = io.listen(27015);

var locations = {
  1: [0, 0],
  2: [10, 0],
  3: [10, 10]
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

async function runLoc() {
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
      if (rssi[s][card] && rssi[s][card]['time'] && (((currDate.getTime() - rssi[s][card]['time'].getTime()) / 1000) < 3) && (maxV == null || rssi[s][card]['rssi'] > maxV)) {
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