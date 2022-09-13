import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { options, rtc } from "./config";
import AgoraRTC from "agora-rtc-sdk-ng";


function App() {
  const [joinRoom, setJoinRoom] = useState(false)
  async function join() {
    try {
      setJoinRoom(true)

      rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "h264" });
      const uid = await rtc.client.join(options.appId, options.channel, options.token, null);

      // Create an audio track from the audio sampled by a microphone.
      rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();

      // Create a video track from the video captured by a camera.
      rtc.localVideoTrack = await AgoraRTC.createCameraVideoTrack();
      rtc.localVideoTrack.play("local-stream");

      // Publish the local audio and video tracks to the channel.
      await rtc.client.publish([rtc.localAudioTrack, rtc.localVideoTrack]);
      console.log(rtc.client , "CLIENT COY >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

      rtc.client.on("user-published", async (user, mediaType) => {
        console.log("PUBLISH>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
        // Subscribe to a remote user.
        await rtc.client.subscribe(user, mediaType);
        console.log("subscribe success", user , "USER >>>>>>>>>>>>>>>>>>");

        // If the subscribed track is video.
        if (mediaType === "video") {
          console.log("VIDIO SIHG >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          // Get `RemoteVideoTrack` in the `user` object.
          const remoteVideoTrack = user.videoTrack;
          // Dynamically create a container in the form of a DIV element for playing the remote video track.
          const playerContainer = document.createElement("div");
          // Specify the ID of the DIV container. You can use the `uid` of the remote user.
          playerContainer.id = user.uid.toString();
          playerContainer.style.width = "640px";
          playerContainer.style.height = "480px";
          document.body.append(playerContainer);

          // Play the remote video track.
          // Pass the DIV container and the SDK dynamically creates a player in the container for playing the remote video track.
          console.log("PLAY WOIIII >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
          remoteVideoTrack.play(playerContainer.id);

          // Or just pass the ID of the DIV container.
          // remoteVideoTrack.play(playerContainer.id);
        }

        // If the subscribed track is audio.
        if (mediaType === "audio") {
          // Get `RemoteAudioTrack` in the `user` object.
          const remoteAudioTrack = user.audioTrack;
          // Play the audio track. No need to pass any DOM element.
          remoteAudioTrack.play();
        }
      });

      rtc.client.on("user-unpublished", user => {
        // Get the dynamically created DIV container.
        console.log(user.uid);
        const playerContainer = document.getElementById(user.uid);
        // Destroy the container.
        playerContainer.remove();
      });

      console.log("AAA");
    } catch (error) {
      console.log(error);
    }
    console.log("CCC");
  }

  async function leave() {
    try {
      setJoinRoom(false)
       // Destroy the local audio and video tracks.
      rtc.localAudioTrack.close();
      rtc.localVideoTrack.close();

      // Traverse all remote users.
      rtc.client.remoteUsers.forEach(user => {
        // Destroy the dynamically created DIV container.
        const playerContainer = document.getElementById(user.uid);
        playerContainer && playerContainer.remove();
        console.log("REMOVE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
      });

      // Leave the channel.
      await rtc.client.leave();
    } catch (error) {
      console.log(error);
    }
    console.log("BBB");
  }

  return (
    <div className="App">
      {joinRoom ? 
        <>
          <button id="leave" type="button" className="btn btn-primary btn-sm" onClick={() => leave()} disabled="">Leave</button>
          <h1>JOIN</h1>

          <h2>Local</h2>
          <div id="local-stream" className="stream local-stream"></div>

          <h2>Remote</h2>
          <div
            id="remote-stream"
            className="stream remote-stream"
          ></div>
        </>
        :
        <>
          <button id="join" type="submit" className="btn btn-primary btn-sm" onClick={() => join()}>Join</button>
          <h2>TDK</h2>
        </> 
    }
    </div>
  );
}

export default App;
