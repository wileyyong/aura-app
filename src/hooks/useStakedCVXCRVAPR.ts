import useSWR from 'swr';

import useCVXInfo from './useCVXInfo';

import getRewardRate from '../fetchers/rewardRate';
import getTotalSupply from '../fetchers/totalSupply';
import curveLpValue from '../fetchers/curveLpValue';
import getCVXMintAmount from '../fetchers/cvxMintAmount';
import { useTokenPrice } from '../context/DataProvider';
import { useAddresses } from './useAddresses';

const stakeContract = '0x3Fe65692bfCD0e6CF84cB1E7d24108E434A7587e';
const threePoolStakeContract = '0x7091dbb7fcbA54569eF1387Ac89Eb2a5C9F6d2EA';
const swap = '0xbEbc44782C7dB0a1A60Cb6fe97d0b483032FF1C7';

async function fetchStakedCVXCRVAPR(_: string, cvxPrice: number, crvPrice: number, cvxInfo: any) {
  const [rate, threeRate, supply, virtualPrice] = await Promise.all([
    getRewardRate(stakeContract),
    getRewardRate(threePoolStakeContract),
    getTotalSupply(stakeContract),
    curveLpValue(swap),
  ]);

  const supplyN = Number(supply.toString());
  const rateN = Number(rate.toString());
  const threeRateN = Number(threeRate.toString());
  const virtualPriceN = Number(virtualPrice.toString());

  const supplyP = supplyN * crvPrice;
  const rateP = rateN / supplyP;
  const threeRateP = threeRateN / supplyP;

  const crvPerYear = rateP * 86400 * 365;
  const threePoolPerYear = threeRateP * 86400 * 365;
  const cvxPerYear = getCVXMintAmount(crvPerYear, cvxInfo);

  const crvAPR = crvPerYear * crvPrice;
  const cvxAPR = cvxPerYear * cvxPrice;
  const threeAPR = threePoolPerYear * virtualPriceN * 1e18;

  return { total: crvAPR + cvxAPR + threeAPR, crvAPR, cvxAPR, threeAPR };
}

export default function useStakedCVXCRVAPR() {
  const addresses = useAddresses();

  const cvxPrice = useTokenPrice(addresses.cvx);
  const crvPrice = useTokenPrice(addresses.crv);

  const { data: cvxInfo } = useCVXInfo();

  const shouldFetch = cvxPrice && crvPrice && cvxInfo;

  return useSWR(
    shouldFetch ? ['stakedCVXCRVAPR', cvxPrice, crvPrice, cvxInfo] : null,
    fetchStakedCVXCRVAPR,
  );
}
