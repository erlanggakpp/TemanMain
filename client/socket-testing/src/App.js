import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "http://localhost:4000";

function App() {
  //Before login
  // const [loggedIn, setLoggedIn] = useState(false);
  // const [room, setRoom] = useState("");
  // const [username, setUsername] = useState("");
  //After login
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
      // console.log(data);
      setMessageList(data);
    });
  }, []);

  const connectToRoom = () => {
    setLoggedIn(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: username,
        chat: chat,
      },
    };
    await socket.emit("send_message", messageContent);
    setChat("");
    setMessageList([...messageList, messageContent.content]);
  };
  const leaveRoom = async () => {
    socket.emit("leave_room", room);
    setLoggedIn(false);
  };
  return (
    <div className="App">
      {!loggedIn ? (
        <div className="logIn">
          <input
            type="text"
            placeholder="Name..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <input
            type="text"
            placeholder="Room..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />
          <button onClick={connectToRoom}>Chat</button>
        </div>
      ) : (
        <div className="chatContainer">
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
      )}
    </div>
  );
}

export default App;
