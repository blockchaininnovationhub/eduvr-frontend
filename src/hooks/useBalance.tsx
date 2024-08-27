import { useReadContract } from "wagmi";
import abi from "./../abi/passport.json";

const useBalance = (address: string) => {
  const result = useReadContract({
    abi,
    address: process.env.NEXT_PUBLIC_MEME_TOKEN_FACTORY as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  return result;
};

export default useBalance;
