import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import React, {
  FC,
  createContext,
  useEffect,
  useMemo,
  useContext,
  useState,
  useCallback,
} from 'react';
import { ADDRESS } from '../constants';
import { CrvDepositor, CvxLocker, CvxLocker__factory } from '../typechain';
import { CvxRewardPool } from '../typechain/CvxRewardPool';
import { CrvDepositor__factory } from '../typechain/factories/CrvDepositor__factory';
import { CvxRewardPool__factory } from '../typechain/factories/CvxRewardPool__factory';
import { useAddress, useChainId, useProvider } from './AppProvider';

interface State {
  initialised: boolean;
  crv?: string;
  contracts: {
    cvxLocker?: CvxLocker;
    cvxRewardPool?: CvxRewardPool;
    crvDepositer?: CrvDepositor;
  };
}

interface Dispatch {}

const initialState = {
  initialised: false,
  contracts: {},
};

const stateCtx = createContext<State>(null as never);
const dispatchCtx = createContext<Dispatch>(null as never);

export const DataProvider: FC = ({ children }) => {
  const provider = useProvider();
  const address = useAddress();
  const chainId = useChainId();

  const [state, setState] = useState<State>(initialState);

  const initContracts = useCallback(
    (provider: Web3Provider | JsonRpcProvider) => {
      const crvDepositer = CrvDepositor__factory.connect(
        ADDRESS[chainId].crvDepositer,
        provider,
      );
      const cvxLocker = CvxLocker__factory.connect(
        ADDRESS[chainId].cvxLocker,
        provider,
      );
      const cvxRewardPool = CvxRewardPool__factory.connect(
        ADDRESS[chainId].cvxRewardPool,
        provider,
      );
      return {
        crvDepositer,
        cvxLocker,
        cvxRewardPool,
      };
    },
    [chainId],
  );

  useEffect(() => {
    (async () => {
      if (!provider || state.initialised) return;
      try {
        const contracts = initContracts(provider);
        const crv = await contracts.crvDepositer?.crv();

        const newState = {
          ...state,
          initialised: true,
          crv,
          contracts,
        };

        setState(newState);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [address, initContracts, provider, state]);

  return (
    <stateCtx.Provider value={useMemo(() => state, [state])}>
      <dispatchCtx.Provider value={useMemo(() => ({}), [])}>
        {children}
      </dispatchCtx.Provider>
    </stateCtx.Provider>
  );
};

export const useDataProvider = (): [State, Dispatch] => [
  useContext(stateCtx),
  useContext(dispatchCtx),
];

export const useDataState = (): State => useContext(stateCtx);

export const useDataDispatch = (): Dispatch => useContext(dispatchCtx);

export const useContracts = (): State['contracts'] =>
  useContext(stateCtx).contracts;
