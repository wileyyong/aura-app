import { useAddress, useChainId } from '../context/AppProvider';
import { useContracts } from '../context/ContractProvider';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';
import { sum } from 'lodash';
import { useTokenPrices } from '../context/DataProvider';

interface State {
  rewards: Record<string, number>;
  totalUSD: number;
}

export const useUserRewards = () => {
  const chainId = useChainId();
  const contracts = useContracts();
  const address = useAddress();
  const prices = useTokenPrices();
  const [value, setValue] = useState<State>();

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
          v => parseBN(v.amount, 18) * parseBN(prices?.[v.token.toLowerCase()], 18),
        ),
      );

      setValue({ rewards, totalUSD });
    })();
  }, [chainId, contracts, prices, address]);

  return useMemo(() => value, [value]);
};
