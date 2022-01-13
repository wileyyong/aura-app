import useSWR from 'swr';
import { Web3Provider } from '@ethersproject/providers';

import useChainId from './useChainId';
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
import useReadProvider from './useReadProvider';

async function fetchPoolApr(
  _: string,
  pool: Pool,
  cvxInfo: { [key: string]: BigNumber },
  cvxPrice: number,
  crvPrice: number,
  chainId: number,
  provider: Web3Provider,
) {
  const rewardRate = await getRewardRate(pool.crvRewards);
  const curveLpValue = await getCurveLpValue(pool.swap);
  const totalSupply = await getTotalSupply(pool.crvRewards);
  const underlyingCoins = await getUnderlyingCoins(
    chainId,
    pool.swap,
    provider,
  );
  const underlyingPrice = await getPrice(underlyingCoins);

  const rewardRateN = Number(rewardRate.toString());
  const totalSupplyN = Number(totalSupply.toString());
  const curveLpValueN = Number(curveLpValue.toString());

  const virtualSupply = totalSupplyN * curveLpValueN;

  const crvPerUnderlying = rewardRateN / virtualSupply;
  const crvPerYear = crvPerUnderlying * 86400 * 365;
  const normalisedUnderlyingPrice = Number(underlyingPrice.toString());

  const cvxPerYear = cvxMintAmount(crvPerYear, cvxInfo);

  const crvApr =
    crvPerYear * (Number(crvPrice.toString()) / normalisedUnderlyingPrice);
  const cvxApr =
    cvxPerYear * (Number(cvxPrice.toString()) / normalisedUnderlyingPrice);

  return (crvApr + cvxApr) / 1e18;
}

export default function usePoolApr(pool: Pool) {
  const chainId = useChainId();
  const provider = useReadProvider();
  const { data: cvxInfo } = useCVXInfo();

  const cvxAddress = chainId && ADDRESS[chainId].cvx;
  const crvAddress = chainId && ADDRESS[chainId].crv;

  const { data: cvxPrice } = usePrice(
    typeof cvxAddress === 'string' ? [cvxAddress] : undefined,
  );

  const { data: crvPrice } = usePrice(
    typeof crvAddress === 'string' ? [crvAddress] : undefined,
  );

  const shouldFetch = pool && chainId && cvxPrice && crvPrice;

  return useSWR(
    shouldFetch
      ? ['poolApr', pool, cvxInfo, cvxPrice, crvPrice, chainId, provider]
      : null,
    fetchPoolApr,
  );
}
