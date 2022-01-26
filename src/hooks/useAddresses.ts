import { useMemo } from 'react';
import { useChainId } from '../context/AppProvider';
import { ADDRESS, Contracts, DEFAULT_CHAIN_ID, supportedChainIds } from '../constants';

export const useAddresses = (): Contracts => {
  const chainId = useChainId();
  return useMemo(
    () => ADDRESS[supportedChainIds.includes(chainId) ? chainId : DEFAULT_CHAIN_ID],
    [chainId],
  );
};
