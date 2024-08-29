import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const Board = () => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  useEffect(() => {
    const sessionId = prompt("Please enter session id");
    const peer = new Peer(sessionId);

    peer.on("open", (id) => {
      console.log("My session ID is " + id);
    });

    peer.on("call", (call) => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localRef.current.srcObject = stream;

          localRef.current.onloadedmetadata = () => {
            localRef.current.play();
          };

          call.answer(stream);

          call.on("stream", () => {});
        });
    });

    peer.on("connection", (connection) => {
      console.log("Connected:", connection);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });
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
