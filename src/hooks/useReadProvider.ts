import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';

import useChainId from './useChainId';
import { RPC_URLS } from '../constants';
import { useProvider } from '../context/AppProvider';

export default function useReadProvider() {
  const [readProvider, setReadProvider] = useState<
    undefined | JsonRpcProvider
  >();

  const provider = useProvider();

  const chainId = useChainId();

  useEffect(() => {
    if (provider) {
      setReadProvider(provider);
      return;
    }

    if (chainId) {
      setReadProvider(new JsonRpcProvider(RPC_URLS[chainId]));
      return;
    }
  }, [chainId, provider]);

  return readProvider;
}
