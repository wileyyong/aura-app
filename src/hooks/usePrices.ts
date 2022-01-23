import { useMemo } from 'react';
import { BigNumber } from 'ethers';
import useSWR from 'swr';
import { getPrices } from '../fetchers/price';
import { toBN } from '../utils';

async function fetchPrices(_: string, contractAddresses: string[], currency: string) {
  const data = await getPrices(contractAddresses, currency);
  const priceArr = Object.keys(data).map(k => ({
    [k]: toBN(data[k].usd),
  }));
  const prices = priceArr.reduce((a, b) => ({ ...a, ...b }), {});
  return prices;
}

export const usePrices = (contractAddress: string[]): Record<string, BigNumber> | undefined => {
  const { data } = useSWR(['getPrices', contractAddress, 'usd'], fetchPrices);
  return useMemo(() => (!data ? undefined : data), [data]);
};
