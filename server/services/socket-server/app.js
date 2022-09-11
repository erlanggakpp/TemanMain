const express = require("express");
const socket = require("socket.io");
const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(express.json());

const server = app.listen(port, () => {
  console.log(`App is listening to ${port}`);
});
let io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", (data) => {
    socket.join(data); //Data itu room numbernya
    socket.emit("init_chat", [
      {
        author: "ANGGA",
        message: "TEST " + data,
      },
      {
        author: "ANGGA",
        message: "TEST123 " + data,
      },
    ]);
    console.log("user Joined the room " + data);
  });
  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("user disconnected");
  });
  //   socket.on("leave_room", () => {
  //     console.log("user disconnected");
  //   });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data.content);
  });
});
