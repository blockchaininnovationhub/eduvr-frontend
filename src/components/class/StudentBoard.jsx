import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const StudentBoard = () => {
  const ref = useRef(null);
  const currentPeer = useRef(null);

  const call = (remotePeerId) => {
    console.log("Calling " + remotePeerId);

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        ref.current.srcObject = stream;
        ref.current.play();

        const call = currentPeer.current.call(remotePeerId, stream);

        call.on("stream", (remoteStream) => {
          console.log("received stream");
          ref.current.srcObject = remoteStream;
          ref.current.play();
        });

        call.on("close", () => {
          console.log("Call ended");
        });

        call.on("error", (err) => {
          console.error("Call error:", err);
        });
      })
      .catch((err) => {
        console.error("Failed to get local stream:", err);
      });
  };

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My session ID: " + id);
      call("session-xyzqqwX3Y");
    });

    peer.on("connection", () => {
      console.log("Connected to peer server");
    });

    peer.on("error", (err) => {
      console.error("Peer error:", err);
    });

    currentPeer.current = peer;

    return () => {
      peer.destroy();
    };
  }, []);

  return (
    <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
      <video
        ref={ref}
        className="w-full h-full object-cover"
        controls
        preload="none"
        autoPlay
      ></video>
    </div>
  );
};
