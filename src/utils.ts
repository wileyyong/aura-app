import { BigNumber, ethers } from 'ethers';

export const shortAddress = (address: string) =>
  address.substring(0, 4) + '...' + address.substring(address.length - 2, address.length);

export const mediumAddress = (address: string) =>
  address.substring(0, 8) + '...' + address.substring(address.length - 8, address.length);

export const parseBN = (bn?: BigNumber, scale?: number): number => {
  const parsed = parseInt(bn?.toString() ?? '0');
  if (scale) return parsed / 10 ** scale;
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

export const toFixed = (x: any) => {
  let e: number;
  if (Math.abs(x) < 1.0) {
    e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = '0.' + new Array(e).join('0') + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split('+')[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join('0');
    }
  }
  return x.toString();
};

export const toBN = (num: number, scale = 18) => {
  const pow = 10 ** scale;
  return ethers.BigNumber.from(toFixed(num * pow));
};
