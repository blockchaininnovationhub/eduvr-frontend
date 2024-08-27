import axios from "../network/axios";
import useError from "./useError";
import useMessage from "./useMessage";
import { signMessage } from "@wagmi/core";
import { config } from "../wagmi";
import { useAccount } from "wagmi";
import { useCallback } from "react";

const useLogin = () => {
  const { message, setMessage, clearMessage } = useMessage();
  const { error, hasError, clearError } = useError();
  const { address } = useAccount();

  const login = useCallback(async () => {
    try {
      clearError();
      clearMessage();
      const timestamp = Date.now() + 300 * 1000;
      const signature = await signMessage(config, {
        message: `${address?.toLowerCase()}:${timestamp}`,
      });
      const req = await axios.post("/auth/login", {
        signature,
        timestamp,
        walletAddress: address?.toLowerCase(),
      });
      setMessage(req.data.message);
    } catch (error: any) {
      setMessage(error.response?.data.message);
      hasError();
    }
  }, [address]);

  return { error, message, login };
};

export default useLogin;
