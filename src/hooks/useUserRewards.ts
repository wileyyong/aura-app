import usePrice from './usePrice';
import { useAddress, useChainId } from '../context/AppProvider';
import { useContracts } from '../context/ContractProvider';
import { ADDRESS } from '../constants';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';
import { sum } from 'lodash';

interface State {
  rewards: Record<string, number>;
  totalUSD: number;
}

// TODO: -
// [x] crvCVX
// [] curve pool rewards
export const useUserRewards = () => {
  const chainId = useChainId();
  const contracts = useContracts();
  const address = useAddress();
  const [value, setValue] = useState<State>();

  const cvxAddress = (chainId && ADDRESS[chainId].cvx.toLowerCase()) || '';
  const crvAddress = (chainId && ADDRESS[chainId].crv.toLowerCase()) || '';
  const cvxCrvAddress = (chainId && ADDRESS[chainId].cvxCRV.toLowerCase()) || '';

  const { data: cvxPrice } = usePrice(typeof cvxAddress === 'string' ? [cvxAddress] : undefined);

  const { data: cvxCrvPrice } = usePrice(
    typeof cvxCrvAddress === 'string' ? [cvxCrvAddress] : undefined,
  );

  const { data: crvPrice } = usePrice(typeof crvAddress === 'string' ? [crvAddress] : undefined);

  const prices = useMemo(
    () => ({
      [crvAddress]: crvPrice,
      [cvxAddress]: cvxPrice,
      [cvxCrvAddress]: cvxCrvPrice,
    }),
    [crvAddress, crvPrice, cvxAddress, cvxCrvAddress, cvxCrvPrice, cvxPrice],
  );

  useEffect(() => {
    (async () => {
      const cvxLocker = contracts.cvxLocker;

      if (!cvxLocker || !address) return 0;

      const [claimableRewards] = await Promise.all([cvxLocker.claimableRewards(address)]);

      const rewards = claimableRewards
        .map(v => ({ [v.token]: parseBN(v.amount, 18) }))
        .reduce((a, b) => ({ ...a, ...b }), {});

      const totalUSD = sum(
        claimableRewards.map(
          v => parseBN(v.amount, 18) * parseBN(prices[v.token.toLowerCase()], 18),
        ),
      );

      setValue({ rewards, totalUSD });
    })();
  }, [chainId, contracts, prices, address]);

  return useMemo(() => value, [value]);
};
