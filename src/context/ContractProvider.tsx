import React, { FC, createContext, useEffect, useMemo, useContext, useState } from 'react';
import { useAddresses } from '../hooks/useAddresses';
import { CrvDepositor, CvxLocker, CvxLocker__factory } from '../typechain';
import { CvxRewardPool } from '../typechain/CvxRewardPool';
import { CrvDepositor__factory } from '../typechain/factories/CrvDepositor__factory';
import { CvxRewardPool__factory } from '../typechain/factories/CvxRewardPool__factory';
import { useProvider } from './AppProvider';

interface State {
  cvxLocker?: CvxLocker;
  cvxRewardPool?: CvxRewardPool;
  crvDepositor?: CrvDepositor;
}

const stateCtx = createContext<State>(null as never);

export const ContractProvider: FC = ({ children }) => {
  const provider = useProvider();
  const addresses = useAddresses();

  const [state, setState] = useState<State>({});

  useEffect(() => {
    if (!provider) return;

    const {
      crvDepositor: crvDepositerAddress,
      cvxLocker: cvxLockerAddress,
      cvxRewardPool: cvxRewardPoolAddress,
    } = addresses;

    const crvDepositor = CrvDepositor__factory.connect(crvDepositerAddress, provider);
    const cvxLocker = CvxLocker__factory.connect(cvxLockerAddress, provider);
    const cvxRewardPool = CvxRewardPool__factory.connect(cvxRewardPoolAddress, provider);

    setState({
      crvDepositor,
      cvxLocker,
      cvxRewardPool,
    });
  }, [addresses, provider]);

  return <stateCtx.Provider value={useMemo(() => state, [state])}>{children}</stateCtx.Provider>;
};

export const useContracts = (): State => useContext(stateCtx);
