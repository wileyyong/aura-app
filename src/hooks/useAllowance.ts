import { BigNumberish } from 'ethers';
import { useCallback, useMemo } from 'react';
import useSWR from 'swr';
import { useSigner } from '../context/AppProvider';
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
  const signer = useSigner();

  const shouldFetch = !!signer && !!spender && tokenAddress;

  const token = useMemo(
    () => signer && tokenAddress && Erc20__factory.connect(tokenAddress, signer),
    [signer, tokenAddress],
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
