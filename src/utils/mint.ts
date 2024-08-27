import { simulateContract, writeContract } from "@wagmi/core";
import memeTokenFactoryAbi from "../abi/passport.json";
import { config } from "../wagmi";

const mintToken = async (): Promise<string> => {
  const { request, result } = await simulateContract(config, {
    abi: memeTokenFactoryAbi,
    address: process.env.NEXT_PUBLIC_MEME_TOKEN_FACTORY as `0x${string}`,
    functionName: "safeMint",
  });

  const hash = await writeContract(config, request);

  console.log(hash, result);

  return result;
};

export default mintToken;
