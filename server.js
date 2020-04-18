const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://10.0.0.233:9200' })

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.get("/api/get_sensors_by_room", async function (req, res) {
  const { room_id } = req.query

  //Get a list of sensors given the room_id
  const sensors_from_db = [
    {
      id: 1,
      name: "sensor1",
      room_id: 1,
      x: 70,
      y: 90
    },
    {
      id: 2,
      name: "sensor2",
      room_id: 1,
      x: 110,
      y: 90
    }
  ];

  const sensors = sensors_from_db.filter(x => x.room_id == room_id);

  res.json(sensors);
})

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
          "sensors": []
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
          "sensors": []
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
          "id": 4,
          "name": "Kitchen",
          "width": 100,
          "height": 100,
          "sensors": []
        },
        {
          "id": 5,
          "name": "Bathroom",
          "width": 100,
          "height": 50
        },
        {
          "id": 6,
          "name": "Lobby",
          "width": 100,
          "height": 100,
          "sensors": []
        }
      ]
    }
  ]

  console.log(buildings)
  res.json(buildings)
});

app.post("/api/create_building", async function (req, res) {
  console.log("----------Creating Building---------------");
  console.log(req.body)

  return res.status(200).send({
    message: `POST create_building succeeded`
  })
})

app.post("/api/remove_building", async function (req, res) {
  console.log("----------Removing Building---------------");
  const { building_id } = req.body

  return res.status(200).send({
    message: `POST create_building succeeded`
  })
})

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
    {
      id: 1,
      name: "sensor1",
      room_id: 1,
      x: 70,
      y: 90
    },
    {
      id: 2,
      name: "sensor2",
      room_id: 1,
      x: 110,
      y: 90
    }
  ];
  // console.log(sensors)
  res.json(sensors);
});

app.post("/api/create_sensor", async function (req, res) {
  console.log("----------Creating Sensor---------------");

  const { sensorName, sensorId, sensor_x, sensor_y, room_id } = req.body;
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
  // const cards = (await esClient.search({
  //   index: 'blupoint_cards',
  //   size: 10000,
  //   body: {
  //     "query": {
  //       "match_all": {}
  //     }
  //   }
  // })).body.hits.hits.map(function (i) {
  //   return i['_source'];
  // });

  let cards = [
    {
      id: "1JHB3",
      itemName: "Dog Food"
    },
    {
      id: "2IY5",
      itemName: "Fish Tanks"
    }
  ];
  // console.log(cards)
  res.json(cards);
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

  // res.json(await esClient.search({
  //   "index": 'blupoint_history',
  //   "query": {
  //     "match_all": {}
  //   },
  //   "collapse": {
  //     "field": "card",
  //     "inner_hits": {
  //       "name": "most_recent",
  //       "size": 1,
  //       "sort": [{ "time": "desc" }]
  //     }
  //   }
  // }).body.hits.hits.map(function (i) {
  //   return i['_source'];
  // }));

  //returns array of objects -> {card_id, sensor_id}
});

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