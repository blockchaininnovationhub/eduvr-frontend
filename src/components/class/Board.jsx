import { useEffect, useRef, useState, useMemo } from "react";
import Peer from "peerjs";
import { createEmptyMediaStream } from "@/utils/stream";

export const Board = ({ sessionId }) => {
  const localRef = useRef(null);
  const [callStates, setCallStates] = useState([]);
  const [stream, setStream] = useState(createEmptyMediaStream());

  const getStream = useMemo(() => {
    return stream;
  }, [stream]);

  const shareScreen = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        localRef.current.srcObject = stream;

        localRef.current.onloadedmetadata = () => {
          localRef.current.play();
        };

        setStream(stream);
        callStates.forEach((callState, _) => {
          callState.peerConnection.getSenders().forEach((sender) => {
            if (
              sender.track.kind === "audio" &&
              stream.getAudioTracks().length > 0
            ) {
              sender.replaceTrack(stream.getAudioTracks()[0]);
            }
            if (
              sender.track.kind === "video" &&
              stream.getVideoTracks().length > 0
            ) {
              sender.replaceTrack(stream.getVideoTracks()[0]);
            }
          });
        });
      });
  };

  useEffect(() => {
    const peer = new Peer(sessionId);

    peer.on("open", (id) => {
      console.log("My session ID is " + id);
    });

    peer.on("call", (call) => {
      const _callStates = callStates;
      _callStates.push(call);
      setCallStates(_callStates);
      call.answer(getStream());
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
        className="w-1/2 h-full object-cover"
        controls
      ></video>

      <button className="bg-red-500" onClick={shareScreen}>
        shareScreen
      </button>
    </div>
  );
};
