import { useMemo } from 'react';
import useSWR from 'swr';
import { useProvider } from '../context/AppProvider';
import { Erc20, Erc20__factory } from '../typechain';

function fetchBalance(_: string, token: Erc20, address: string) {
  return token.balanceOf(address);
}

export const useBalanceOf = (tokenAddress: string, address: string | undefined) => {
  const provider = useProvider();

  const token = useMemo(
    () => provider && address && Erc20__factory.connect(tokenAddress, provider),
    [provider, tokenAddress],
  );

  return useSWR(token ? ['balanceOf', token, address] : null, fetchBalance);
};
