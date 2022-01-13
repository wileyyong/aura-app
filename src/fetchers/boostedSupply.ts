import { ethers } from "ethers";
import alchemyFetcher from "./alchemyFetcher";

export default async function boostedSupply(contract: string) {
  const totalSupply = "75aadf61";

  const params = [
    {
      to: contract,
      data: `0x${totalSupply}`,
    },
    "latest",
  ];

  const data = await alchemyFetcher(params);
  return ethers.BigNumber.from(data.result);
}
