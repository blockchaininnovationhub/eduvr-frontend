import { simulateContract, writeContract } from "@wagmi/core";
import memeTokenFactoryAbi from "../abi/passport.json";
import { config } from "../wagmi";
import { getChainId } from "@wagmi/core";

const chainId = getChainId(config);

export const getPassportContractAddress = (): string => {
  if (chainId == 656476) return "0xb8c296aCA0Aef6C8E6fD254A077E1978C63011Fb";

  return "0xb8c296aCA0Aef6C8E6fD254A077E1978C63011Fb";
};

const mintPassport = async (): Promise<string> => {
  const { request, result } = await simulateContract(config, {
    abi: memeTokenFactoryAbi,
    address: getPassportContractAddress() as `0x${string}`,
    functionName: "safeMint",
  });

  const hash = await writeContract(config, request);

  console.log(hash, result);

  return result;
};

export default mintPassport;
