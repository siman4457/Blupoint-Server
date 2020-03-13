sensors = [];

const addSensor = ({ id, name, position, macAddress, connection }) => {
  name = name.trim().toLowerCase();
  macAddress = macAddress.trim();

  //Check if there is an existing sensor
  const existingSensor = sensors.find(
    sensor => sensor.name === name && sensor.macAddress === macAddress
  );

  if (existingSensor) {
    return { error: "Sensor name is taken" };
  }

  const sensor = { id, name, room };
  sensors.push(sensor);

  return { sensor };
};

const removeSensor = id => {
  const index = sensors.findIndex(sensor => sensor.id === id);

  if (index !== -1) {
    return sensors.splice(index, 1)[0];
  }
};

const getSensor = id => {
  return sensors.find(sensor => sensor.id === id);
};

module.exports = { addSensor, removeSensor, getSensor };
