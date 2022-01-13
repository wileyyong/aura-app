import { useCallback } from 'react';
import { Interface } from 'ethers/lib/utils';

import { useChainId, useProvider } from '../context/AppProvider';
import { ADDRESS, MAX_GAS_LIMIT } from '../constants';

import { Multicall__factory } from '../typechain/factories/Multicall__factory';

export interface Call {
  address: string;
  name: string;
  params: (string | number)[];
}

export default function useMulticall(itf: Interface) {
  const provider = useProvider();
  const chainId = useChainId();

  return useCallback(
    async (calls: Call[]) => {
      if (!provider || !chainId) return;

      const multicallAddress = ADDRESS[chainId].multicall;

      const multiCall = Multicall__factory.connect(multicallAddress, provider);

      const calldata: { target: string; callData: any }[] = calls.map(call => ({
        target: call.address.toLowerCase(),
        callData: itf.encodeFunctionData(call.name, call.params),
      }));

      const { returnData } = await multiCall.aggregate(calldata, {
        gasLimit: MAX_GAS_LIMIT[chainId],
      });

      const resp = returnData.map((call, i) =>
        itf.decodeFunctionResult(calls[i].name, call),
      );

      return resp;
    },
    [itf, provider, chainId],
  );
}
