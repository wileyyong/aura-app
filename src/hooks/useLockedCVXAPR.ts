import { useContracts } from '../context/ContractProvider';
import { useEffect, useMemo, useState } from 'react';
import { parseBN } from '../utils';
import { useTokenPrice } from '../context/DataProvider';
import { useAddresses } from './useAddresses';

export const useLockedCVXAPR = () => {
  const addresses = useAddresses();
  const contracts = useContracts();
  const [apr, setApr] = useState(0);

  const cvxPrice = useTokenPrice(addresses.cvx);
  const crvPrice = useTokenPrice(addresses.crv);

  useEffect(() => {
    (async () => {
      const cvxLocker = contracts.cvxLocker;

      if (!cvxLocker || !crvPrice || !cvxPrice) return 0;

      const [boostedSupply, rewardData] = await Promise.all([
        cvxLocker.boostedSupply(),
        cvxLocker.rewardData(addresses.cvxCRV),
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
  }, [addresses, crvPrice, cvxPrice, contracts]);

  return useMemo(
    () => ({
      total: apr,
    }),
    [apr],
  );
};
