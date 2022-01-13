import { ethers } from 'ethers';
import alchemyFetcher from './alchemyFetcher';

export default async function totalSupply(contract: string) {
  const totalSupply = '18160ddd';

  const params = [
    {
      to: contract,
      data: `0x${totalSupply}`,
    },
    'latest',
  ];

  const data = await alchemyFetcher(params);
  return ethers.BigNumber.from(data.result);
}
