import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { useChainId, useProvider } from '../context/AppProvider';
import usePrice from './usePrice';
import useCVXInfo from './useCVXInfo';
import { Pool } from './usePoolInfo';
import getRewardRate from '../fetchers/rewardRate';
import getCurveLpValue from '../fetchers/curveLpValue';
import getTotalSupply from '../fetchers/totalSupply';
import cvxMintAmount from '../fetchers/cvxMintAmount';
import getUnderlyingCoins from '../fetchers/underlyingCoins';
import getPrice from '../fetchers/price';

import { ADDRESS } from '../constants';
import { BigNumber } from 'ethers';

async function fetchPoolApr(
  _: string,
  pool: Pool,
  cvxInfo: { [key: string]: BigNumber },
  cvxPrice: number,
  crvPrice: number,
  chainId: number,
  provider: Web3Provider,
) {
  const [rewardRate, curveLpValue, totalSupply, underlyingCoins] = await Promise.all([
    getRewardRate(pool.crvRewards),
    getCurveLpValue(pool.swap),
    getTotalSupply(pool.crvRewards),
    getUnderlyingCoins(chainId, pool.swap, provider),
  ]);
  const underlyingPrice = await getPrice(underlyingCoins);

  const rewardRateN = Number(rewardRate.toString());
  const totalSupplyN = Number(totalSupply.toString());
  const curveLpValueN = Number(curveLpValue.toString());

  const virtualSupply = totalSupplyN * curveLpValueN;

  const crvPerUnderlying = rewardRateN / virtualSupply;
  const crvPerYear = crvPerUnderlying * 86400 * 365;
  const normalisedUnderlyingPrice = Number(underlyingPrice.toString());

  const cvxPerYear = cvxMintAmount(crvPerYear, cvxInfo);

  const crvApr = (crvPerYear * (Number(crvPrice.toString()) / normalisedUnderlyingPrice)) / 1e18;
  const cvxApr = (cvxPerYear * (Number(cvxPrice.toString()) / normalisedUnderlyingPrice)) / 1e18;

  return { crvApr, cvxApr, total: crvApr + cvxApr };
}

export default function usePoolApr(pool: Pool) {
  const chainId = useChainId();
  const provider = useProvider();
  const { data: cvxInfo } = useCVXInfo();

  const cvxAddress = chainId && ADDRESS[chainId].cvx;
  const crvAddress = chainId && ADDRESS[chainId].crv;

  const { data: cvxPrice } = usePrice(typeof cvxAddress === 'string' ? [cvxAddress] : undefined);

  const { data: crvPrice } = usePrice(typeof crvAddress === 'string' ? [crvAddress] : undefined);

  const shouldFetch = pool && chainId && cvxPrice && crvPrice;

  return useSWR(
    shouldFetch ? ['poolApr', pool, cvxInfo, cvxPrice, crvPrice, chainId, provider] : null,
    fetchPoolApr,
  );
}
