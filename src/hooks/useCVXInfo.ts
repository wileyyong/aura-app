import useSWR from 'swr';
import { useMemo } from 'react';
import { ADDRESS } from '../constants';

import useChainId from './useChainId';
import useMulticall, { Call } from './useMulticall';
import { Cvx__factory } from '../typechain/factories/Cvx__factory';

async function fetcher(
  _: string,
  chainId: number,
  multicall: (calls: Call[]) => Promise<any>,
) {
  const calls = [
    { address: ADDRESS[chainId].cvx, name: 'reductionPerCliff', params: [] },
    { address: ADDRESS[chainId].cvx, name: 'totalCliffs', params: [] },
    { address: ADDRESS[chainId].cvx, name: 'totalSupply', params: [] },
    { address: ADDRESS[chainId].cvx, name: 'maxSupply', params: [] },
  ];

  const resp = await multicall(calls);

  return {
    reductionPerCliff: resp[0][0],
    totalCliffs: resp[1][0],
    totalSupply: resp[2][0],
    maxSupply: resp[3][0],
  };
}

export default function useCVXInfo() {
  const chainId = useChainId();
  const itf = useMemo(() => Cvx__factory.createInterface(), []);

  const multicall = useMulticall(itf);

  return useSWR(['cvxInfo', chainId, multicall], fetcher);
}
