import { ethers } from 'ethers';
import alchemyFetcher from './alchemyFetcher';

export default async function rewardRate(contractAddress: string) {
  const rewardRate = '7b0a47ee';

  const params = [
    {
      to: contractAddress,
      data: `0x${rewardRate}`,
    },
    'latest',
  ];

  const data = await alchemyFetcher(params);

  return ethers.BigNumber.from(data.result);
}
