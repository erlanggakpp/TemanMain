import { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "http://localhost:4000";

export default function RoomChat({ magnetId }) {
  const [chat, setChat] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  useEffect(() => {
    socket.on("init_chat", (data) => {
      console.log(data);
      setMessageList(data);
    });
  }, []);

  const connectToRoom = () => {
    socket.emit("join_room", magnetId.id);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: magnetId.id,
      content: {
        author: "hardcode",
        chat: chat,
      },
    };
    await socket.emit("send_message", messageContent);
    setChat("");
    setMessageList([...messageList, messageContent.content]);
  };
  const leaveRoom = async () => {
    socket.emit("leave_room", magnetId.id);
  };
  return (
    <>
      <section style={{ "background-color": "white" }}>
        <div class="col-12">
          <div class="card" id="chat1" style={{ "border-radius": "15px" }}>
            <div
              class="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
              style={{
                "border-top-left-radius": "15px",
                "border-top-right-radius": "15px",
              }}
            >
              <i class="fas fa-angle-left"></i>
              <p class="mb-0 fw-bold">Live chat</p>
              <i class="fas fa-times"></i>
            </div>
            <div class="card-body">
              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    "border-radius": "15px",
                    "background-color": "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">
                    Hello and thank you for intiving, bro lu tau erlangga ga?
                  </p>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-end mb-4">
                <div
                  class="p-3 me-3 border"
                  style={{
                    "border-radius": "15px",
                    "background-color": "#fbfbfb",
                  }}
                >
                  <p class="small mb-0">kaya pernah denger, yang mana sih?</p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div class="ms-3" style={{ "border-radius": "15px" }}>
                  <div class="bg-image">
                    <img
                      src="https://media-exp1.licdn.com/dms/image/C4E03AQEA2hq7k-y8iQ/profile-displayphoto-shrink_200_200/0/1625029397449?e=2147483647&v=beta&t=ZFojw_cAobe7-gi_NJ-gMOoheyV85ucCW6PQWwOVxbc"
                      style={{ "border-radius": "15px" }}
                      alt="video"
                    />
                    <a href="#!">
                      <div class="mask"></div>
                    </a>
                  </div>
                </div>
              </div>

              <div class="d-flex flex-row justify-content-start mb-4">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  style={{ width: "45px", height: "100%" }}
                />
                <div
                  class="p-3 ms-3"
                  style={{
                    "border-radius": "15px",
                    "background-color": "rgba(57, 192, 237,.2)",
                  }}
                >
                  <p class="small mb-0">yang teacher itu loohhh...</p>
                </div>
              </div>
              {/* <div className="chatContainer">
          <div className="messages">
            {messageList.map((el, idx) => {
              return (
                <>
                  <h3>
                    {el.author} {el.chat}
                  </h3>
                </>
              );
            })}
          </div>
          <div className="messageInput">
            <input
              type="text"
              placeholder="Message..."
              onChange={(e) => {
                setChat(e.target.value);
              }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <button onClick={leaveRoom}>Leave</button>
        </div>
       */}

              <form action="">
                <div class="flex-grow-0 py-3 px-4 border-top">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Type your message"
                    />
                    <button class="btn btn-primary">Send</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
