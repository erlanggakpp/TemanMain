import { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Swal = require("sweetalert2");

let socket;
const CONNECTION_PORT = "http://localhost:4000";

export default function RoomChat({ magnetDetail, magnetId }) {
  const navigate = useNavigate();
  const [chat, setChat] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const { loggedUser } = useSelector((e) => e.users);

  console.log(loggedUser, "<<<<<<<<<<");

  const joinGroupChat = () => {
    let flag = false;

    if (+loggedUser.id === +magnetDetail.UserId) {
      flag = true;
    } else {
      const targetParticipant = magnetDetail.Participant.find(
        (el) => +el.UserId === +loggedUser.id
      );
      if (targetParticipant) {
        flag = true;
      }
    }
    if (flag === true) {
      connectToRoom();
      setOpenChat(true);
    } else {
      if (!localStorage.getItem("access_token")) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Please login`,
        }).then(() => navigate("/login"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `You are not a participant of this magnet`,
        });
      }
    }
  };
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
    socket.emit("join_room", {
      roomName: "magnet" + magnetId,
      magnetId,
      access_token: localStorage.access_token,
    });
  };
  console.log(messageList, "<<<<<<<<<<");
  const sendMessage = async (e) => {
    e.preventDefault();
    let messageContent = {
      room: "magnet" + magnetId,
      content: {
        UserId: loggedUser.id,
        author: `${loggedUser.firstName} ${loggedUser.lastName}`,
        chat: chat,
        User: {
          profilePict: loggedUser.profilePict,
        },
      },
      access_token: localStorage.access_token,
      magnetId: magnetId,
    };
    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setChat("");
  };
  const leaveRoom = async () => {
    setOpenChat(false);
    socket.emit("leave_room", magnetId);
  };
  return (
    <>
      {openChat ? (
        <section style={{ "background-color": "white" }}>
          <div class="col-12">
            <div>
              <img
                src="https://cdn.discordapp.com/attachments/1015235714780246077/1019592908053151874/livechataaa.jpg"
                alt=""
                className="w-100 p-0"
              />
            </div>
            <div class="card mt-0" id="chat1">
              <div
                class="card-header d-flex justify-content-between align-items-center p-0 bg-primary text-white border-0"
                // style={{
                //   "border-top-left-radius": "15px",
                //   "border-top-right-radius": "15px",
                // }}
              >
                <i class="fas fa-angle-left"></i>
                <i class="fas fa-times"></i>
              </div>
              <div class="card-body">
                {messageList.map((el, idx) => {
                  return (
                    <>
                      {loggedUser.id === el.UserId ? (
                        <div class="d-flex flex-row justify-content-end mb-4">
                          <div
                            class="p-3 me-3 border"
                            style={{
                              "border-radius": "15px",
                              "background-color": "#fbfbfb",
                            }}
                          >
                            <p class="small mb-0">
                              <strong>{el.author}</strong>
                            </p>
                            <p class="small mb-0">{el.chat}</p>
                          </div>
                          <img
                            src={el.User.profilePict}
                            alt="avatar 1"
                            style={{ width: "45px", height: "100%" }}
                          />
                        </div>
                      ) : (
                        <div class="d-flex flex-row justify-content-start mb-4 p-3">
                          <img
                            src={el.User.profilePict}
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
                              <strong>{el.author}</strong>
                            </p>
                            <p class="small mb-0">{el.chat}</p>
                          </div>
                        </div>
                      )}
                      {/* ini chat kiri */}
                      {/* <div class="d-flex flex-row justify-content-start mb-4 p-3">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="avatar 1"
                        style={{ width: "45px", height: "100%" }}
                      />

                      <div
                        className="p-3 ms-3"
                        style={{
                          "border-radius": "15px",
                          "background-color": "rgba(57, 192, 237,.2)",
                        }}
                      >
                        <p className="small mb-0">
                          <strong>{el.author}</strong>
                        </p>
                        <p className="small mb-0">{el.chat}</p>
                      </div>
                    </div> */}
                    </>
                  );
                })}

                {/* ini chat kanan */}
                {/* <div className="d-flex flex-row justify-content-end mb-4">
                  <div
                    className="p-3 me-3 border"
                    style={{
                      "border-radius": "15px",
                      "background-color": "#fbfbfb",
                    }}
                  >
                    <p className="small mb-0">kaya pernah denger, yang mana sih?</p>
                  </div>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1"
                    style={{ width: "45px", height: "100%" }}
                  />
                </div> */}

                <div className="chatContainer flex-grow-0 py-3 px-4 border-top">
                  <div>
                    <div className="messageInput d-flex">
                      <form onSubmit={sendMessage} className="d-flex w-100">
                        <input
                          type="text"
                          className="form-control"
                          style={{ height: "50px" }}
                          placeholder="Message..."
                          onChange={(e) => {
                            setChat(e.target.value);
                          }}
                          value={chat}
                        />
                        <button className="btn btn-primary">Send</button>
                      </form>
                    </div>
                    <button
                      className="btn btn-danger mt-5 px-4"
                      onClick={leaveRoom}
                    >
                      <h3 className="p-0"> close chat</h3>
                    </button>
                  </div>

                  {/* <button onClick={leaveRoom}>Leave</button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="border rounded p-5">
          <div type="button" className="" onClick={joinGroupChat}>
            <img
              src="https://cdn.discordapp.com/attachments/1015235714780246077/1019615959448830114/livechatbutton.jpg"
              alt=""
              className="w-100"
            />
          </div>
        </div>
      )}
    </>
  );
}
