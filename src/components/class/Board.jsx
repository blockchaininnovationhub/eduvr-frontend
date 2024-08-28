import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

export const Board = () => {
  const ref = useRef(null);
  const [stream, setStream] = useState(null);

  useEffect(() => {
    const peer = new Peer("session-xyzqqwXY");

    peer.on("open", (id) => {
      console.log("My session ID is " + id);

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          ref.current.srcObject = stream;
          ref.current.play();

          peer.on("call", (call) => {
            console.log("received call");
            call.answer(stream);
            call.on("stream", (remoteStream) => {
              ref.current.srcObject = remoteStream;
              ref.current.play();
            });
          });

          setStream(stream);
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
        ref={ref}
        className="w-full h-full object-cover"
        autoPlay
        preload="none"
      ></video>
    </div>
  );
};
