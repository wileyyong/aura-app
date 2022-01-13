import { ethers } from 'ethers';
import alchemyFetcher from './alchemyFetcher';

function padHex(hexstring: string, intSize = 256) {
  hexstring = hexstring.replace('0x', '');

  var length = intSize / 4 - hexstring.length;
  for (var i = 0; i < length; i++) {
    hexstring = '0' + hexstring;
  }
  return hexstring;
}

export default async function rewardRateOf(
  contractAddress: string,
  token: string,
) {
  const rewardRateOf = '48e5d9f8';
  const tokenPad = padHex(token);

  const params = [
    {
      to: contractAddress,
      data: `0x${rewardRateOf}${tokenPad}`,
    },
    'latest',
  ];

  const data = await alchemyFetcher(params);

  const result = '0x' + data.result.slice(130, 194);

  return ethers.BigNumber.from(result);
}
