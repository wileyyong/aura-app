import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { useProvider } from '../context/AppProvider';

async function fetcher(_: string, provider: Web3Provider) {
  const network = await provider.getNetwork();
  return network.chainId;
}

export default function useChainId() {
  const provider = useProvider();
  return useSWR(['chainId', provider], fetcher).data;
}
