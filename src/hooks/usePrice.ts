import { ethers } from 'ethers';
import useSWR from 'swr';

import getPrice from '../fetchers/price';

// stolen from https://stackoverflow.com/questions/1685680/how-to-avoid-scientific-notation-for-large-numbers-in-javascript
function toFixed(x: any) {
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
}

async function fetchPrice(_: string, contractAddresses: string[], currency: string) {
  const price = await getPrice(contractAddresses, currency);
  return ethers.BigNumber.from(toFixed(price * 1e18));
}

export default function usePrice(addresses: undefined | string[], currency = 'USD') {
  const shouldFetch = addresses && addresses.length <= 0;

  return useSWR(shouldFetch ? null : ['getPrice', addresses, currency], fetchPrice);
}
