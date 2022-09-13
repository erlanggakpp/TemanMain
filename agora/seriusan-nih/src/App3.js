import React, { useState, useEffect } from "react";
import "./App.css";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from 'axios'

let client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

let localTracks = {
  videoTrack: null,
  audioTrack: null,
};

let remoteUsers = {};

// Agora client options
let options = {
  appid: "9046360bacb641249331f2077a1938b2",
  channel: null,
  uid: null,
  token: null,
  role: "host"
};

client.setClientRole(options.role);

function App() {
  const [channelName, setChannelName] = useState("")
  const [joinRoom, setJoinRoom] = useState(false)
  const data = { isPublisher: 1 }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    data.channel = channelName
    options.channel = channelName
    console.log(data);
    console.log(options);
    await axios.post('http://localhost:4000/rtctoken', data)
      .then(function (response) {
      options.uid = response.data.uid
      options.token = response.data.token
    })
    .catch(function (error) {
      console.log(error);
    });

    await join()
  }

  async function join() {
    setJoinRoom(true)

    // add event listener to play remote tracks when remote user publishs.
    client.on("user-published", handleUserPublished);
    client.on("user-unpublished", handleUserUnpublished);

    // join a channel and create local tracks, we can use Promise.all to run them concurrently
    [ options.uid, localTracks.audioTrack, localTracks.videoTrack ] = await Promise.all([
      // join the channel
      client.join(options.appid, options.channel, options.token, options.uid),
      // create local tracks, using microphone and camera
      AgoraRTC.createMicrophoneAudioTrack(),
      AgoraRTC.createCameraVideoTrack()
    ]);

    // play local video track
    localTracks.videoTrack.play("local-player");
    document.getElementById("local-player-name").innerHTML = `localVideo(${options.uid})`

    // publish local tracks to channel
    await client.publish(Object.values(localTracks));
    console.log("publish success");
  }

  async function subscribe(user, mediaType) {
    const uid = user.uid;
  
      // subscribe to a remote user
    await client.subscribe(user, mediaType);
    console.log("subscribe success");
  
    if (mediaType === 'video') {
      const container = document.createElement("div");
      container.id = `player-wrapper-${uid}`
      container.className = "col-md-3 mt-3"
      const p = document.createElement("p");
      p.className = "player-name color-white"
      const textnode = document.createTextNode(`remoteUser(${uid})`);
      p.appendChild(textnode);
      const div = document.createElement("div");
      div.id = `player-${uid}`
      div.className = "stream-remote"
      container.appendChild(div);
      container.appendChild(p);

      document.getElementById("remote-playerlist").append(container);
      
      user.videoTrack.play(`player-${uid}`);
    }

    if (mediaType === 'audio') {
      user.audioTrack.play();
    }
  }

  function handleUserPublished(user, mediaType) {
    const id = user.uid;
    remoteUsers[id] = user;
    subscribe(user, mediaType);
  }

  
  function handleUserUnpublished(user) {
    const id = user.uid;
    delete remoteUsers[id];
    document.getElementById(`player-wrapper-${id}`).remove()
  }
  
  async function leave() {
    for (let trackName in localTracks) {
      var track = localTracks[trackName];
      if (track) {
        track.stop();
        track.close();
        localTracks[trackName] = undefined;
      }
    }

    // remove remote users and player views
    remoteUsers = {};
    document.getElementById("remote-playerlist").remove();
    document.getElementById("local-player-name").innerHTML = ""

    // leave the channel
    await client.leave();
    setJoinRoom(false)
    setChannelName("")
    console.log("client leaves channel success");
  }

  return (
    <div className="App">
      {joinRoom ? 
        <>
          <div className="container my-5 px-5">
            <h2 style={{ color: "white" }} className="my-4"> { channelName }</h2>
            <div className="stream-local mb-3" id="local-player">

            </div>
            <p style={{ color: "white" }} id="local-player-name" className="player-name">Nama</p>
            <div className="row" id="remote-playerlist">
            </div>
            <div className="footer my-5">
                <center>
                    <button className="btn btn-danger" onClick={() => leave()}><i className="fa-solid fa-phone"></i> End Meeting</button>
                </center>
            </div>
        </div>
          {/* <div className="row video-group">
            <div className="col">
              <p id="local-player-name" className="player-name"></p>
              <div id="local-player" className="player"></div>
            </div>
            <div className="w-100"></div>
            <div className="col">
              <div id="remote-playerlist"></div>
            </div>
          </div> */}
        </>
        :
        <>
          <div className="container my-5">
            <form onSubmit={handleSubmit}>
              <input name="channel" id="channel" className="form-control" style={{  width: 500 }} value={channelName} onChange={(e) => setChannelName(e.target.value)}  />
              <button id="join" type="submit" className="btn btn-primary btn-sm my-3">Join</button>
            </form>
          </div>
          <h2>TDK</h2>
        </> 
    }
    </div>
  );
}

export default App;
