import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { useProvider } from '../context/AppProvider';
import { DEFAULT_CHAIN_ID } from '../constants';

async function fetcher(_: string, provider: Web3Provider) {
  if (!provider) return DEFAULT_CHAIN_ID;

  const network = await provider.getNetwork();
  return network.chainId;
}

export default function useChainId() {
  const provider = useProvider();
  return useSWR(['chainId', provider], fetcher).data;
}
