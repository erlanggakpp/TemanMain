// const server = require("../app");
// const socket = require("socket.io");
// const axios = require("axios");

// let io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   socket.on("join_room", async (data) => {
//     socket.join(data); //Data itu room numbernya
//     const { data: chatList } = await axios({
//       method: "GET",
//       url: `http://localhost:4001/chats/magnet/1`,
//       headers: {
//         access_token:
//           "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IlZpc2l0b3IiLCJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiaWF0IjoxNjYyODI0NTk3fQ.H3TogtEMX_LrMM0SBAl3DBbzrFIze1UMJEcloM_ZjTk",
//       },
//     });
//     socket.emit("init_chat", chatList);
//     console.log("user Joined the room " + data);
//   });
//   socket.on("leave_room", (data) => {
//     socket.leave(data);
//     console.log("user disconnected");
//   });
//   //   socket.on("leave_room", () => {
//   //     console.log("user disconnected");
//   //   });

//   socket.on("send_message", (data) => {
//     socket.to(data.room).emit("receive_message", data.content);
//   });
// });
