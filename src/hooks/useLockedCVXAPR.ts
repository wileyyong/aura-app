import useSWR from 'swr';

import usePrice from './usePrice';
import useChainId from './useChainId';
import { ADDRESS } from '../constants';
import getRewardRateOf from '../fetchers/rewardRateOf';
import getBoostedSupply from '../fetchers/boostedSupply';

const stakedAddress = '0xD18140b4B819b895A3dba5442F959fA44994AF50';

async function fetchLockedCVXAPR(
  _: string,
  chainId: number,
  cvxPrice: number,
  crvPrice: number,
) {
  const cvxCrvAddress = ADDRESS[chainId].cvxCRV;

  const rewardRate = await getRewardRateOf(stakedAddress, cvxCrvAddress);
  const boostedSupply = await getBoostedSupply(stakedAddress);

  const supply = boostedSupply.mul(cvxPrice);

  const rewardRateN = Number(rewardRate.toString());
  const supplyN = Number(supply.toString());

  const rate = rewardRateN / supplyN;

  const crvPerYear = rate * 86400 * 365;
  return crvPerYear * crvPrice;
}

export default function useLockedCVXAPR() {
  const chainId = useChainId();

  const cvxAddress = chainId && ADDRESS[chainId].cvx;
  const crvAddress = chainId && ADDRESS[chainId].crv;

  const { data: cvxPrice } = usePrice(
    typeof cvxAddress === 'string' ? [cvxAddress] : undefined,
  );

  const { data: crvPrice } = usePrice(
    typeof crvAddress === 'string' ? [crvAddress] : undefined,
  );

  const shouldFetch = chainId && cvxPrice && crvPrice;

  return useSWR(
    shouldFetch ? ['lockedCVXAPR', chainId, cvxPrice, crvPrice] : null,
    fetchLockedCVXAPR,
  );
}
