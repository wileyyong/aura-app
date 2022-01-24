import { BigNumberish } from 'ethers';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useProvider } from '../context/AppProvider';
import { Erc20, Erc20__factory } from '../typechain';
import { handleTx } from '../utils/handleTx';

function fetchAllowance(_: string, token: Erc20, owner: string, spender: string) {
  return token.allowance(owner, spender);
}

export const useAllowance = (
  tokenAddress: string,
  owner: string | undefined,
  spender: string | undefined,
) => {
  const provider = useProvider();

  const shouldFetch = !!provider && !!spender && tokenAddress;

  const token = useMemo(
    () => provider && tokenAddress && Erc20__factory.connect(tokenAddress, provider),
    [provider, tokenAddress],
  );

  const approve = useCallback(
    (spender: string, amount: BigNumberish) => {
      return token && handleTx(() => token.approve(spender, amount));
    },
    [token],
  );

  const obj = useSWR(shouldFetch ? ['balanceOf', token, owner, spender] : null, fetchAllowance);

  return { ...obj, approve };
};
