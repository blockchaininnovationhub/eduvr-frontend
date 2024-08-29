import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const StudentBoard = () => {
  const remoteRef = useRef(null);
  const currentPeer = useRef(null);

  const call = (remotePeerId) => {
    console.log("Calling " + remotePeerId);

    const emptyStream = new MediaStream();

    const videoTrack = new MediaStreamTrack({
      kind: "video",
      label: "dummy-video",
      enabled: true,
      muted: true,
      readyState: "live",
      id: "video-dummy-id",
    });

    const audioTrack = new MediaStreamTrack({
      kind: "audio",
      label: "dummy-audio",
      enabled: true,
      muted: true,
      readyState: "live",
      id: "audio-dummy-id",
    });

    emptyStream.addTrack(videoTrack);
    emptyStream.addTrack(audioTrack);

    const call = currentPeer.current.call(remotePeerId, emptyStream);

    console.log(call);

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
        ref={localRef}
        className="w-1/3 h-full object-cover"
        controls
      ></video>
      <video
        ref={remoteRef}
        src="/Venice_5.mp4"
        className="w-1/3 h-full object-cover"
        controls
      ></video>
      <video
        src="/Venice_5.mp4"
        className="w-1/3 h-full object-cover"
        controls
      ></video>
    </div>
  );
};
