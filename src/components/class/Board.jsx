import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const Board = () => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  useEffect(() => {
    const peer = new Peer("session-universal12");

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

          call.on("stream", (remoteStream) => {
            remoteRef.current.srcObject = remoteStream;
            remoteRef.current.onloadedmetadata = () => {
              remoteRef.current.play();
            };
          });
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
    <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
      <video
        ref={localRef}
        className="w-1/2 h-full object-cover"
        controls
      ></video>
      <video
        ref={remoteRef}
        className="w-1/2 h-full object-cover"
        controls
        autoPlay
      ></video>
    </div>
  );
};
