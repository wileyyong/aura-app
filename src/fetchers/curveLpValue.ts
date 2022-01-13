import { ethers } from 'ethers';
import alchemyFetcher from './alchemyFetcher';

export default async function curveLpValue(address: string, amount = 1) {
  const virtualPriceHash = 'bb7b8b80';

  const params = [
    {
      to: address,
      data: `0x${virtualPriceHash}`,
    },
    'latest',
  ];

  const data = await alchemyFetcher(params);
  const value = data.result.slice(0, 66); // grab first 32 bytes
  const priceDecimal = Math.pow(10, 18);
  return ethers.BigNumber.from(value).div(priceDecimal.toString()).mul(amount);
}
