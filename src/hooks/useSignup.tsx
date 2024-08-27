import { useAccount } from "wagmi";
import axios from "../network/axios";
import useError from "./useError";
import useMessage from "./useMessage";
import { signMessage } from "@wagmi/core";
import { config } from "../wagmi";

const useSignup = () => {
  const { message, setMessage, clearMessage } = useMessage();
  const { error, hasError, clearError } = useError();
  const { address } = useAccount();

  const signup = async () => {
    try {
      clearError();
      clearMessage();
      const timestamp = Date.now() + 300 * 1000;
      const signature = await signMessage(config, {
        message: `${address?.toLowerCase()}:${timestamp}`,
      });
      const req = await axios.post("/auth/signup", {
        walletAddress: address?.toLowerCase(),
        signature,
        timestamp,
      });
      setMessage(req.data.message);
    } catch (error: any) {
      setMessage(error.response.data.message);
      hasError();
    }
  };

  return { error, message, signup };
};

export default useSignup;
