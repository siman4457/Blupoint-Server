const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);
// var socket = require("socket.io-client")("http://localhost");

const PORT = process.env.PORT || 5000;
const router = require("./router");

app.use(router);

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

io.on("connection", socket => {
  console.log("We have a new connection!");

  socket.on("disconnect", () => {
    console.log("User has left.");
  });
});
