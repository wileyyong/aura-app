import { useCallback } from 'react';
import { Interface } from 'ethers/lib/utils';
import flatten from 'lodash/flatten';
import chunk from 'lodash/chunk';

import { useChainId, useProvider } from '../context/AppProvider';
import { MAX_GAS_LIMIT } from '../constants';

import { Multicall__factory } from '../typechain/factories/Multicall__factory';
import { useAddresses } from './useAddresses';

export interface Call {
  address: string;
  name: string;
  params: (string | number)[];
}

// NOTE: move itf into calls argument to reduce number
// of PRC calls futher
export default function useMulticall(itf: Interface) {
  const provider = useProvider();
  const chainId = useChainId();
  const addresses = useAddresses();

  return useCallback(
    async (calls: Call[] | Array<Call[]>) => {
      if (!provider || !chainId) return;

      const chunkSize = Array.isArray(calls[0]) ? calls[0].length : 1;

      const callsFlat: Call[] = flatten(calls);

      const multicallAddress = addresses.multicall;

      const multiCall = Multicall__factory.connect(multicallAddress, provider);

      const calldata: { target: string; callData: any }[] = callsFlat.map(call => ({
        target: call.address.toLowerCase(),
        callData: itf.encodeFunctionData(call.name, call.params),
      }));

      const { returnData } = await multiCall.aggregate(calldata, {
        gasLimit: MAX_GAS_LIMIT[chainId],
      });

      const resp = returnData.map((call, i) => itf.decodeFunctionResult(callsFlat[i].name, call));

      return chunkSize > 1 ? chunk(resp, chunkSize) : resp;
    },
    [itf, provider, chainId],
  );
}
