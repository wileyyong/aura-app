import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import useSWR from 'swr';
import { getPrices } from '../fetchers/price';
import { toBN } from '../utils';

async function fetchPrice(_: string, contractAddress: string, currency: string) {
  const data = await getPrices([contractAddress], currency);
  const priceArr = Object.keys(data).map(k => ({
    [k]: toBN(data[k].usd),
  }));
  const prices = priceArr.reduce((a, b) => ({ ...a, ...b }), {});
  return prices[contractAddress.toLowerCase()];
}

export const usePrice = (contractAddress: string): BigNumber | undefined => {
  const { data } = useSWR(['getPrice', contractAddress, 'usd'], fetchPrice);
  return useMemo(() => (!data ? undefined : data), [data]);
};
