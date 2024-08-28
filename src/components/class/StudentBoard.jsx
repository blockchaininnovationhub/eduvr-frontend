import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const StudentBoard = () => {
  const ref = useRef(null);
  const currentPeer = useRef(null);

  const call = (remotePeerId) => {
    console.log("Call to " + remotePeerId);
    var getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: false, audio: true }, (stream) => {
      const call = currentPeer.current.call(remotePeerId, stream);

      call.on("stream", (remoteStream) => {
        console.log(remoteStream);
        ref.current.srcObject = remoteStream;
        ref.current.play();
      });
    });
  };

  useEffect(() => {
    const peer = new Peer();
    peer.on("open", (id) => {
      console.log("my session" + id);
      call("session-xyzqqw");
    });

    peer.on("connection", () => {
      console.log("connected to peer server");
    });

    currentPeer.current = peer;
  }, []);
  return (
    <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
      <video
        ref={ref}
        className="w-full h-full object-cover"
        autoPlay
        preload="none"
      ></video>
    </div>
  );
};
