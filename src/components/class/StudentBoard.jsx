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

        // Play the local stream after it has loaded
        localRef.current.onloadedmetadata = () => {
          localRef.current.play();
        };

        const call = currentPeer.current.call(remotePeerId, stream);

        call.on("stream", (remoteStream) => {
          console.log("Received stream");
          remoteRef.current.srcObject = remoteStream;

          // Play the remote stream after it has loaded
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
      call("session-universal1");
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
