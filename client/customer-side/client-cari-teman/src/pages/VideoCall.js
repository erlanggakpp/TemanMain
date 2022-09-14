import React, { useState, useEffect } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import axios from 'axios'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


let client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });

let localTracks = {
  videoTrack: null,
  audioTrack: null,
};

var localTrackState = {
  videoTrackEnabled: true,
  audioTrackEnabled: true
}

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

function VideoCall() {
    const navigate = useNavigate()
    const [channelName, setChannelName] = useState("")
    const [joinRoom, setJoinRoom] = useState(false)
    const { magnetDetail, dataVideoCall } = useSelector((e) => e.magnets);

  useEffect(async () => {
        setChannelName(`Magnet${magnetDetail.id}`)
        options.channel = `Magnet${magnetDetail.id}`
        options.uid = dataVideoCall.uid
        options.token = dataVideoCall.token

        await join()
  }, [])
  
  function handleClickVideo() {
    if (localTrackState.videoTrackEnabled) {
      muteVideo();
    } else {
      unmuteVideo();
    }
  }

  function handleClickAudio() {
    if (localTrackState.audioTrackEnabled) {
      muteAudio();
    } else {
      unmuteAudio();
    }
  }

  async function muteVideo() {
    if (!localTracks.videoTrack) return;
    await localTracks.videoTrack.setEnabled(false);
    localTrackState.videoTrackEnabled = false;
    document.getElementById("mute-video").innerHTML = "Unmute Video";
  }

  async function unmuteVideo() {
    if (!localTracks.videoTrack) return;
    await localTracks.videoTrack.setEnabled(true);
    localTrackState.videoTrackEnabled = true;
    document.getElementById("mute-video").innerHTML = "Mute Video";
  }

  async function muteAudio() {
    if (!localTracks.audioTrack) return;
    await localTracks.audioTrack.setEnabled(false);
    localTrackState.audioTrackEnabled = false;
    document.getElementById("mute-audio").innerHTML = "Unmute Audio";
  }

  async function unmuteAudio() {
    if (!localTracks.audioTrack) return;
    await localTracks.audioTrack.setEnabled(true);
    localTrackState.audioTrackEnabled = true;
    document.getElementById("mute-audio").innerHTML = "Mute Audio";
  }

  async function join() {
    setJoinRoom(true)

    client.on("user-published", handleUserPublished);
    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);

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

  function handleUserJoined(user) {
    const id = user.uid;
    remoteUsers[id] = user;
  }

  function handleUserLeft(user) {
    const id = user.uid;
    delete remoteUsers[id];
    document.getElementById(`player-wrapper-${id}`).remove();
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
    subscribe(user, mediaType);
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
    document.getElementById("remote-playerlist").innerHTML= ""
    document.getElementById("local-player-name").innerHTML = ""

    // leave the channel
    await client.leave();
    setJoinRoom(false)
    setChannelName("")
    console.log("client leaves channel success");
  }

    return (
      <>
        {joinRoom ? 
          <>
            <div className="py-4"></div>
          <div className="container my-5 px-5">
            <h2 className="my-4"> { channelName }</h2>
            <div className="stream-local mb-3" id="local-player">

            </div>
            <p id="local-player-name" className="player-name"></p>
            <div className="row" id="remote-playerlist">
            </div>
            <div className="footer my-5">
                <center>
                    <button id="mute-audio" onClick={() => handleClickAudio()} type="button" class="btn btn-primary btn-sm">Mute Audio</button>
                    <button id="mute-video" onClick={() => handleClickVideo()} type="button" class="btn btn-primary btn-sm">Mute Video</button>
                    <button className="btn btn-danger" onClick={() => leave()}><i className="fa-solid fa-phone"></i> End Meeting</button>
                </center>
            </div>
        </div>
          </>
          :
          <>
              <div className="py-4"></div>
            <div className="container my-5 px-5">
              
            <h1>video call has ended</h1>
          </div>
          </>
        }      
          
        </>
    );
}

export default VideoCall;
