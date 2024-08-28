import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const Board = () => {
  const ref = useRef(null);

  useEffect(() => {
    const peer = new Peer("session");
    peer.on("open", (id) => {
      console.log("my session" + id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (stream) => {
        ref.current.srcObject = stream;
        ref.current.play();
        call.answer(stream);
      });
    });

    peer.on("connection", (connection) => {
      console.log(connection);
    });
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
