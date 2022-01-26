import useSWR from 'swr';
import { useMemo } from 'react';

import useMulticall, { Call } from './useMulticall';
import { Cvx__factory } from '../typechain/factories/Cvx__factory';
import { useAddresses } from './useAddresses';

async function fetcher(_: string, cvxAddress: string, multicall: (calls: Call[]) => Promise<any>) {
  const calls = [
    { address: cvxAddress, name: 'reductionPerCliff', params: [] },
    { address: cvxAddress, name: 'totalCliffs', params: [] },
    { address: cvxAddress, name: 'totalSupply', params: [] },
    { address: cvxAddress, name: 'maxSupply', params: [] },
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
  const addresses = useAddresses();
  const itf = useMemo(() => Cvx__factory.createInterface(), []);

  const cvxAddress = addresses.cvx;

  const multicall = useMulticall(itf);

  return useSWR(['cvxInfo', cvxAddress, multicall], fetcher);
}
