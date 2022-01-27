import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import { useProvider } from '../context/AppProvider';
import useCVXInfo from './useCVXInfo';
import { Pool } from './usePoolInfo';
import getRewardRate from '../fetchers/rewardRate';
import getCurveLpValue from '../fetchers/curveLpValue';
import getTotalSupply from '../fetchers/totalSupply';
import cvxMintAmount from '../fetchers/cvxMintAmount';
import getUnderlyingCoins from '../fetchers/underlyingCoins';
import { getAveragePrice } from '../fetchers/price';

import { BigNumber } from 'ethers';
import { useTokenPrice } from '../context/DataProvider';
import { useAddresses } from './useAddresses';
import { PoolApr } from '../types';

async function fetchPoolApr(
  _: string,
  pool: Pool,
  cvxInfo: { [key: string]: BigNumber },
  cvxPrice: number,
  crvPrice: number,
  registryAddress: string,
  provider: Web3Provider,
): Promise<PoolApr> {
  const [rewardRate, curveLpValue, totalSupply, underlyingCoins] = await Promise.all([
    getRewardRate(pool.crvRewards),
    getCurveLpValue(pool.swap),
    getTotalSupply(pool.crvRewards),
    getUnderlyingCoins(registryAddress, pool.swap, provider),
  ]);
  const underlyingPrice = await getAveragePrice(underlyingCoins);

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
  const addresses = useAddresses();
  const provider = useProvider();
  const { data: cvxInfo } = useCVXInfo();

  const registryAddress = addresses.registry;

  const cvxPrice = useTokenPrice(addresses.cvx);
  const crvPrice = useTokenPrice(addresses.crv);

  const shouldFetch = !!pool && !!cvxPrice && !!crvPrice;

  return useSWR(
    shouldFetch ? ['poolApr', pool, cvxInfo, cvxPrice, crvPrice, registryAddress, provider] : null,
    fetchPoolApr,
  );
}
