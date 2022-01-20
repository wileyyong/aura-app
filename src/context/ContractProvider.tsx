import React, { FC, createContext, useEffect, useMemo, useContext, useState } from 'react';
import { ADDRESS } from '../constants';
import { CrvDepositor, CvxLocker, CvxLocker__factory } from '../typechain';
import { CvxRewardPool } from '../typechain/CvxRewardPool';
import { CrvDepositor__factory } from '../typechain/factories/CrvDepositor__factory';
import { CvxRewardPool__factory } from '../typechain/factories/CvxRewardPool__factory';
import { useChainId, useProvider } from './AppProvider';

interface State {
  cvxLocker?: CvxLocker;
  cvxRewardPool?: CvxRewardPool;
  crvDepositer?: CrvDepositor;
}

const stateCtx = createContext<State>(null as never);

export const ContractProvider: FC = ({ children }) => {
  const provider = useProvider();
  const chainId = useChainId();

  const [state, setState] = useState<State>({});

  useEffect(() => {
    if (!provider) return;

    const { crvDepositer: crvDepositerAddress } = ADDRESS[chainId];
    const { cvxLocker: cvxLockerAddress } = ADDRESS[chainId];
    const { cvxRewardPool: cvxRewardPoolAddress } = ADDRESS[chainId];

    const crvDepositer = CrvDepositor__factory.connect(crvDepositerAddress, provider);
    const cvxLocker = CvxLocker__factory.connect(cvxLockerAddress, provider);
    const cvxRewardPool = CvxRewardPool__factory.connect(cvxRewardPoolAddress, provider);

    setState({
      crvDepositer,
      cvxLocker,
      cvxRewardPool,
    });
  }, [chainId, provider]);

  return <stateCtx.Provider value={useMemo(() => state, [state])}>{children}</stateCtx.Provider>;
};

export const useContracts = (): State => useContext(stateCtx);
