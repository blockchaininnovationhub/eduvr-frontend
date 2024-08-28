import { useEffect, useRef } from "react";
import Peer from "peerjs";

export const StudentBoard = () => {
  const localRef = useRef(null);
  const remoteRef = useRef(null);
  const currentPeer = useRef(null);

  const call = (remotePeerId) => {
    console.log("Calling " + remotePeerId);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localRef.current.srcObject = stream;

        localRef.current.onloadedmetadata = () => {
          localRef.current.play();
        };

        const call = currentPeer.current.call(remotePeerId, stream);

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
      })
      .catch((err) => {
        console.error("Failed to get local stream:", err);
      });
  };

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      console.log("My session ID: " + id);
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
    <div className="w-[1700px] h-[415px] flex flex-col overflow-y-auto bg-slate-900">
      <video
        ref={localRef}
        className="w-1/3 h-full object-cover"
        controls
      ></video>
      <video
        ref={remoteRef}
        className="w-1/3 h-full object-cover"
        controls
      ></video>
      <button
        onClick={() => {
          call("session-universal12");
        }}
      ></button>
    </div>
  );
};
