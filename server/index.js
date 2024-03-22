const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors"); //resolve cors issues
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET"],
  },
}); //now can work with socket.io

io.on("connection", (socket) => {
  //when theres connection, call back function
  console.log(`User connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log(data);
  });
  socket.on("disconnect", () => {
    console.log("User is disconnecting", socket.id);
  });
});

server.listen(3002, () => {
  console.log("Server is runnningg");
});
