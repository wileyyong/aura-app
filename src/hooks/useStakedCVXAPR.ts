import useSWR from 'swr';

import usePrice from './usePrice';
import { ADDRESS } from '../constants';
import getTotalSupply from '../fetchers/totalSupply';
import getRewardRate from '../fetchers/rewardRate';
import useChainId from './useChainId';

const stakedAddress = '0xCF50b810E57Ac33B91dCF525C6ddd9881B139332';

async function fetchCVXAPR(_: any, cvxPrice: number, crvPrice: number) {
  const totalSupply = await getTotalSupply(stakedAddress);
  const rewardRate = await getRewardRate(stakedAddress);

  const supply = totalSupply.mul(cvxPrice);

  const rewardRateN = Number(rewardRate.toString());
  const supplyN = Number(supply.toString());

  const rate = rewardRateN / supplyN;

  const crvPerYear = rate * 86400 * 365;

  return crvPerYear * crvPrice;
}

export default function useStakedCVXAPR() {
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
    shouldFetch ? ['stakedCVXAPR', cvxPrice, crvPrice] : null,
    fetchCVXAPR,
  );
}
