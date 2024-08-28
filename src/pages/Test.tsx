import { useEffect } from "react";
import useLogin from "@/hooks/useLogin";
import { useAccount } from "wagmi";
import useSignup from "@/hooks/useSignup";
import {
  createCall,
  createCallParticipant,
  deactivateCall,
  getAvailablePositions,
  getMyCalls,
  getStats,
} from "@/utils/call";
import AuthMiddleware from "@/middlewares/AuthMiddleware";

const Test = () => {
  const { login } = useLogin();
  const { signup, message, error } = useSignup();

  console.log(message, error);

  const { address } = useAccount();
  useEffect(() => {
    if (!address) return;
    // login();
  }, [address]);
  return (
    <AuthMiddleware>
      address && (
      <>
        <button onClick={createCall}>Create call</button>
        <button onClick={signup}>Sign up</button>
        <button
          onClick={() => {
            createCallParticipant({
              avatar: 1,
              callId: "oJA-XbC-7iAl",
              position: 2,
            });
          }}
        >
          Join Call
        </button>
        <button onClick={getMyCalls}>Get my Call</button>
        <button
          onClick={() => {
            getAvailablePositions("oJA-XbC-7iAl");
          }}
        >
          Get my available positions
        </button>
        <button
          onClick={() => {
            getStats();
          }}
        >
          Get Stats
        </button>

        <button
          onClick={() => {
            deactivateCall("oJA-XbC-7iAl");
          }}
        >
          Deactivate Call
        </button>
      </>
      )
    </AuthMiddleware>
  );
};

export default Test;
