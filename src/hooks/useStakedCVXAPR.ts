import usePrice from './usePrice';
import { ADDRESS } from '../constants';
import { useChainId } from '../context/AppProvider';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';
import { useContracts } from '../context/DataProvider';

// NOTE: CVX rewards address. Total supply * CVX price is TVL
export const useStakedCVXAPR = () => {
  const chainId = useChainId();
  const contracts = useContracts();
  const [apr, setApr] = useState(0);

  const cvxRewardPool = contracts.cvxRewardPool;

  const cvxAddress = chainId && ADDRESS[chainId].cvx;
  const crvAddress = chainId && ADDRESS[chainId].crv;

  const { data: cvxPrice } = usePrice(
    typeof cvxAddress === 'string' ? [cvxAddress] : undefined,
  );

  const { data: crvPrice } = usePrice(
    typeof crvAddress === 'string' ? [crvAddress] : undefined,
  );

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
  }, [cvxRewardPool, chainId, crvPrice, cvxPrice]);

  return useMemo(() => apr, [apr]);
};
