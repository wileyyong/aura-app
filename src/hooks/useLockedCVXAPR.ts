import usePrice from './usePrice';
import { useChainId } from '../context/AppProvider';
import { useContracts } from '../context/ContractProvider';
import { ADDRESS } from '../constants';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';

export const useLockedCVXAPR = () => {
  const chainId = useChainId();
  const contracts = useContracts();
  const [apr, setApr] = useState(0);

  const cvxAddress = chainId && ADDRESS[chainId].cvx;
  const crvAddress = chainId && ADDRESS[chainId].crv;

  const { data: cvxPrice } = usePrice(typeof cvxAddress === 'string' ? [cvxAddress] : undefined);

  const { data: crvPrice } = usePrice(typeof crvAddress === 'string' ? [crvAddress] : undefined);

  useEffect(() => {
    (async () => {
      const cvxLocker = contracts.cvxLocker;

      if (!cvxLocker || !crvPrice || !cvxPrice) return 0;

      const [boostedSupply, rewardData] = await Promise.all([
        cvxLocker.boostedSupply(),
        cvxLocker.rewardData(ADDRESS[chainId].cvxCRV),
      ]);

      const rewardRate = rewardData.rewardRate;
      const supply = boostedSupply.mul(cvxPrice);

      const rewardRateN = parseBN(rewardRate);
      const supplyN = parseBN(supply);

      const rate = rewardRateN / supplyN;

      const crvPerYear = rate * 86400 * 365;

      const apr = crvPerYear * parseBN(crvPrice);

      setApr(apr);
    })();
  }, [chainId, crvPrice, cvxPrice, contracts]);

  return useMemo(
    () => ({
      total: apr,
    }),
    [apr],
  );
};
