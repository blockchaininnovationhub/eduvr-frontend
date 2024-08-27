import { useEffect } from "react";
import useLogin from "@/hooks/useLogin";
import { useAccount } from "wagmi";
import useSignup from "@/hooks/useSignup";

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
    address && (
      <>
        <button onClick={login}>Login</button>
        <button onClick={signup}>Sign up</button>
      </>
    )
  );
};

export default Test;
