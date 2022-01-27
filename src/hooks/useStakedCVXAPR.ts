import { useContracts } from '../context/ContractProvider';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';
import { useTokenPrice } from '../context/DataProvider';
import { useAddresses } from './useAddresses';
import { RewardApr } from '../types';

// NOTE: CVX rewards address. Total supply * CVX price is TVL
export const useStakedCVXAPR = (): RewardApr => {
  const contracts = useContracts();
  const addresses = useAddresses();
  const [apr, setApr] = useState(0);

  const cvxRewardPool = contracts.cvxRewardPool;

  const cvxPrice = useTokenPrice(addresses.cvx);
  const crvPrice = useTokenPrice(addresses.crv);

  useEffect(() => {
    (async () => {
      if (!cvxRewardPool || !crvPrice || !cvxPrice) return;

      const [totalSupply, rewardRate] = await Promise.all([
        cvxRewardPool.totalSupply(),
        cvxRewardPool.rewardRate(),
      ]);

      const supply = totalSupply.mul(cvxPrice);

      const rewardRateN = Number(rewardRate.toString());
      const supplyN = Number(supply.toString());

      const rate = rewardRateN / supplyN;

      const crvPerYear = rate * 86400 * 365;

      const apr = crvPerYear * parseBN(crvPrice);

      setApr(apr);
    })();
  }, [cvxRewardPool, addresses, crvPrice, cvxPrice]);

  return useMemo(() => ({ total: apr }), [apr]);
};
