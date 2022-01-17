import { BigNumber } from 'ethers';

export const shortAddress = (address: string) =>
  address.substring(0, 4) +
  '...' +
  address.substring(address.length - 2, address.length);

export const mediumAddress = (address: string) =>
  address.substring(0, 8) +
  '...' +
  address.substring(address.length - 8, address.length);

export const parseBN = (bn: BigNumber, scale?: number): number => {
  const parsed = parseInt(bn.toString());
  if (scale) return parsed / scale;
  return parsed;
};

export const padHex = (hexstring: string, intSize = 256) => {
  hexstring = hexstring.replace('0x', '');

  var length = intSize / 4 - hexstring.length;
  for (var i = 0; i < length; i++) {
    hexstring = '0' + hexstring;
  }
  return hexstring;
};
