import useSWR from 'swr';

import { useContracts } from '../context/ContractProvider';

import { CvxLocker } from '../typechain';

const fetchRewardWeightOf = (_: string, address: string, contract: CvxLocker) => {
  return contract.rewardWeightOf(address);
};

export const useRewardWeightOf = (address?: string) => {
  const { cvxLocker } = useContracts();

  const shouldFetch = typeof address === 'string' && !!cvxLocker;

  return useSWR(shouldFetch ? ['rewardRateOf', address, cvxLocker] : null, fetchRewardWeightOf);
};
