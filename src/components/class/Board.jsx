import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export const Board = () => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);

  useEffect(() => {
    const peer = new Peer("session-universal1");

    peer.on("open", (id) => {
      console.log("My session ID is " + id);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          localRef.current.srcObject = stream;
          localRef.current.play();

          peer.on("call", (call) => {
            console.log("received call");
            call.answer(stream);

            call.on("stream", (remoteStream) => {
              console.log("received stream");
              remoteRef.current.srcObject = remoteStream;
              remoteRef.current.play();
            });
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream:", err);
        });
    });

    peer.on("connection", (connection) => {
      console.log("Connected:", connection);
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
      <video
        ref={localRef}
        className="w-1/2 h-full object-cover"
        controls
        preload="none"
        autoPlay
      ></video>
      <video
        ref={remoteRef}
        className="w-1/2 h-full object-cover"
        controls
        preload="none"
        autoPlay
      ></video>
    </div>
  );
};
