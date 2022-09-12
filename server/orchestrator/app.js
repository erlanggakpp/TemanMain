const express = require("express");
const app = express();
const port = 4000;
const router = require("./routers/index");
const cors = require("cors");
const socket = require("socket.io");
const axios = require("axios");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const server = app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

let io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join_room", async (data) => {
    socket.join(data); //Data itu room numbernya
    const { data: chatList } = await axios({
      method: "GET",
      url: `http://localhost:4001/chats/magnet/1`,
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODI0NTk3fQ.H3TogtEMX_LrMM0SBAl3DBbzrFIze1UMJEcloM_ZjTk",
      },
    });
    socket.emit("init_chat", chatList);
    console.log("user Joined the room " + data);
  });
  socket.on("leave_room", (data) => {
    socket.leave(data);
    console.log("user disconnected");
  });
  //   socket.on("leave_room", () => {
  //     console.log("user disconnected");
  //   });

  socket.on("send_message", async (data) => {
    const { data: chat } = await axios({
      method: "POST",
      url: `http://localhost:4001/chats`,
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODI0NTk3fQ.H3TogtEMX_LrMM0SBAl3DBbzrFIze1UMJEcloM_ZjTk",
      },
      data: {
        MagnetId: 1,
        chat: data.content.chat,
      },
    });
    socket.to(data.room).emit("receive_message", data.content);
  });
});

// module.exports = server;
