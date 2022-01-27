import React, {
  FC,
  createContext,
  useEffect,
  useMemo,
  useContext,
  useState,
  useCallback,
} from 'react';
import { usePrices } from '../hooks/usePrices';
import { useProvider } from './AppProvider';
import { useContracts } from './ContractProvider';
import { BigNumber } from 'ethers';
import { TOKENS } from '../constants';
import { RewardApr } from '../types';

interface State {
  initialised: boolean;
  prices?: Record<string, BigNumber>;
  modal?: {
    rewardApr?: RewardApr;
  };
}

interface Dispatch {
  setModalData: (modal: { rewardApr?: RewardApr }) => void;
  setRewardApr: (rewardApr?: RewardApr) => void;
}

const initialState = {
  initialised: false,
};

const stateCtx = createContext<State>(null as never);
const dispatchCtx = createContext<Dispatch>(null as never);

export const DataProvider: FC = ({ children }) => {
  const provider = useProvider();
  const contracts = useContracts();
  const prices = usePrices(TOKENS);

  const [state, setState] = useState<State>(initialState);

  // can expand at a later date
  const setModalData = useCallback(
    (modal: { rewardApr?: RewardApr }) => {
      if (!modal?.rewardApr) return;
      const { rewardApr } = modal;
      if (rewardApr?.total === state.modal?.rewardApr?.total) return;
      setState({ ...state, modal: { rewardApr } });
    },
    [state],
  );

  const setRewardApr = useCallback(
    (rewardApr?: RewardApr) => {
      if (!rewardApr || rewardApr?.total === state.modal?.rewardApr?.total) return;
      setState({ ...state, modal: { rewardApr } });
    },
    [state],
  );

  useEffect(() => {
    (async () => {
      if (!provider || !prices || state.initialised) return;

      setState({
        ...state,
        initialised: true,
        prices,
      });
    })();
  }, [contracts, prices, provider, state]);

  return (
    <stateCtx.Provider value={useMemo(() => state, [state])}>
      <dispatchCtx.Provider
        value={useMemo(() => ({ setModalData, setRewardApr }), [setModalData, setRewardApr])}
      >
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

export const useTokenPrices = (): State['prices'] => useContext(stateCtx).prices;

export const useTokenPrice = (address: string): BigNumber | undefined =>
  useContext(stateCtx).prices?.[address.toLowerCase()];

export const useDataDispatch = (): Dispatch => useContext(dispatchCtx);

export const useModalData = (): [State['modal'], Dispatch['setModalData']] => [
  useContext(stateCtx).modal,
  useContext(dispatchCtx).setModalData,
];

export const useModalRewardApr = (): [RewardApr | undefined, Dispatch['setRewardApr']] => [
  useContext(stateCtx).modal?.rewardApr,
  useContext(dispatchCtx).setRewardApr,
];
