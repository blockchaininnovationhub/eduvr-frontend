import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const StudentBoard = () => {
  const remoteRef = useRef(null);
  const currentPeer = useRef(null);

  const createMediaStreamFake = () => {
    return new MediaStream([
      createEmptyAudioTrack(),
      createEmptyVideoTrack({ width: 640, height: 480 }),
    ]);
  };

  const createEmptyAudioTrack = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    const track = dst.stream.getAudioTracks()[0];
    return Object.assign(track, { enabled: false });
  };

  const createEmptyVideoTrack = ({ width, height }) => {
    const canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, width, height);

    const stream = canvas.captureStream();
    const track = stream.getVideoTracks()[0];

    return Object.assign(track, { enabled: false });
  };

  const call = (remotePeerId) => {
    console.log("Calling " + remotePeerId);

    const call = currentPeer.current.call(
      remotePeerId,
      createMediaStreamFake()
    );

    call.on("stream", (remoteStream) => {
      console.log("Received stream");
      remoteRef.current.srcObject = remoteStream;

      remoteRef.current.onloadedmetadata = () => {
        remoteRef.current.play();
      };
    });

    call.on("close", () => {
      console.log("Call ended");
    });

    call.on("error", (err) => {
      console.error("Call error:", err);
    });
  };

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My session ID: " + id);
      const sessionId = prompt("Please enter session id");
      call(sessionId);
    });

    peer.on("connection", () => {
      console.log("Connected to peer server");
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    currentPeer.current = peer;
  }, []);

  return (
    <div className="w-[1700px] h-[415px] flex flex-row relative overflow-y-auto bg-slate-900">
      <video
        ref={remoteRef}
        src="/Venice_5.mp4"
        className="w-full h-full object-cover"
        controls
      ></video>
    </div>
  );
};
