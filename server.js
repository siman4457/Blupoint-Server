const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch')
const esClient = new Client({ node: 'http://localhost:9200' })

app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());

app.get("/api/get_sensors_by_room", async function (req, res) {
  console.log("----------Get Sensors by rooms--------------");
  const { room_id } = req.query
  try {
    //Get a list of sensors given the room_id
    const sensors = (await esClient.search({
      index: 'blupoint_sensors',
      size: 10000,
      body: {
        "query": {
          "match" : {
            "room_id" : {
                "query" : room_id
            }
          }
        }
      }
    })).body.hits.hits.map(function (i) {
      return i['_source'];
    });
    res.json(sensors);
  } catch(error) {
    console.log(error.meta.body.error)
  }
})

app.get("/api/get_buildings", async function (req, res) {
  console.log("----------Get Buildings--------------");

  const buildings = (await esClient.search({
    index: 'blupoint_buildings',
    size: 10000,
    body: {
      "query": {
        "match_all": {}
      }

    }
  })).body.hits.hits.map(function (i) {
    var temp = i['_source'];
    temp['id'] = i['_id']
    return temp;
  });
  res.json(buildings)
});

app.post("/api/create_building", async function (req, res) {
  console.log("----------Creating Building---------------");

  await esClient.index({
    index: 'blupoint_buildings',
    refresh: true,
    body: req.body,
    id: req.body.building_id
  })

  return res.status(200).send({
    message: `POST create_building succeeded`
  })
})

app.post("/api/remove_building", async function (req, res) {
  console.log("----------Removing Building---------------");
  const { building_id } = req.body

  await esClient.delete({
    index: 'blupoint_buildings',
    refresh: true,
    id: buildingId,
  })

  return res.status(200).send({
    message: `POST create_building succeeded`
  })
})

app.get("/api/get_sensors", async function (req, res) {
  console.log("----------Get Sensors--------------");
  const sensors = (await esClient.search({
    index: 'blupoint_sensors',
    size: 10000,
    body: {
      "query": {
        "match_all": {}
      }
    }
  })).body.hits.hits.map(function (i) {
    return i['_source'];
  });
  res.json(sensors);
});

app.post("/api/create_sensor", async function (req, res) {
  console.log("----------Creating Sensor---------------");

  await esClient.index({
    index: 'blupoint_sensors',
    refresh: true,
    body: req.body,
    id: req.body.sensor_id
  })

  return res.status(200).send({
    message: `POST create_sensor succeeded`
  })

});

app.post("/api/remove_sensor", async function (req, res) {
  console.log("----------Removing Sensor---------------");

  const { sensorId } = req.body;

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
  console.log("----------Get Cards--------------");
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
  res.json(cards);
});

app.post("/api/create_id_card", async function (req, res) {
  console.log("----------Creating ID Card---------------");

  await esClient.index({
    index: 'blupoint_cards',
    refresh: true,
    body: req.body,
    id: req.body.id
  })

  return res.status(200).send({
    message: `POST create_id_card succeeded`
  })

});

app.post("/api/remove_id_card", async function (req, res) {
  console.log("----------Removing ID Card---------------");

  console.log(req.body)
  await esClient.delete({
    index: 'blupoint_cards',
    refresh: true,
    id: req.body.id,
  });


  return res.status(200).send({
    message: `POST remove_id_card succeeded`
  })

});

app.get("/api/get_card_locations", async function (req, res) {
  console.log("----------Get Card Locations---------------");
  try {
    let connected_cards = (await esClient.search({
      "index": 'blupoint_history',
      "body": {
        "query": {
          "range" : {
            "time" : {
              "gte" : ((new Date()).getTime() - 10*1000),
            }
          }
        },
        "collapse": {
          "field": "card",
          "inner_hits": {
            "name": "most_recent",
            "size": 1,
            "sort": [{ "time": "desc" }]
          }
        }
      }
    })).body.hits.hits.map(function (i) {
      return i['inner_hits']['most_recent']['hits']['hits'][0]['_source'];
    });
    console.log('connected cards')
    console.log(connected_cards)
    res.json(connected_cards);
  } catch(error) {
    console.log('error in card locations')
    console.log(error.meta.body.error)
  }
});

app.get("/api/get_history", async function (req, res) {
  console.log("----------Get Historical Locations---------------");
  try {
    let historical_cards = (await esClient.search({
      "index": 'blupoint_history',
      "body": {
        "query": {
          "range" : {
            "time" : {
              "lte" : req.body.start,
              "gte" : req.body.end
            }
          }
        }
      }
    })).body.hits.hits.map(function (i) {
      return i['_source'];
    });
    res.json(historical_cards);
  } catch(error) {
    console.log('error in card locations')
    console.log(error.meta.body.error)
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));


//-----------------sensor sockets-----------------

//sensor handler
var io = require('socket.io');
var server = io.listen(27015);
var rssi = {}

server.on('connection', function (socket) {
  console.log('connection')

  socket.on('location', function (from) {
    if (from.card != "\"020b010264f45374376e3372\"") {
      if (!(from.id in rssi)) {
        rssi[from.id] = {}
      }
      rssi[from.id][from.card] = {
        rssi: from.rssi,
        time: new Date()
      }
    }
  })

  socket.on('disconnect', function () {
  })
})

async function runLoc() {
  var cards = [];
  var current_sensors = Object.keys(rssi);
  for (var n in current_sensors) {
    var sensor_id = current_sensors[n];
    for (var i in Object.keys(rssi[sensor_id])) {
      if (!(i in cards)) {
        cards.push(Object.keys(rssi[sensor_id])[i])
      }
    }
  }
  for (var c in cards) {
    var card = cards[c]
    var max = null;
    var maxV = null;
    var currDate = new Date();
    for (var s in rssi) {
      if (rssi[s][card] && rssi[s][card]['time'] && (((currDate.getTime() - rssi[s][card]['time'].getTime()) / 1000) < 5) && (maxV == null || rssi[s][card]['rssi'] > maxV)) {
        max = s;
        maxV = rssi[s][card]['rssi'];
      }
    }
    if (max != null) {
      console.log(card + ' is at ' + max)
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