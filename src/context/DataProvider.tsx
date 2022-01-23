import React, { FC, createContext, useEffect, useMemo, useContext, useState } from 'react';
import { usePrices } from '../hooks/usePrices';
import { useProvider } from './AppProvider';
import { useContracts } from './ContractProvider';
import { BigNumber } from 'ethers';
import { TOKENS } from '../constants';

interface State {
  initialised: boolean;
  prices?: Record<string, BigNumber>;
}

interface Dispatch {
  setDummyAction?: () => void;
}

const initialState = {
  initialised: false,
};

const stateCtx = createContext<State>(null as never);
const dispatchCtx = createContext<Dispatch>(null as never);

/* MARK: - Data provider
 */

export const DataProvider: FC = ({ children }) => {
  const provider = useProvider();
  const contracts = useContracts();
  const prices = usePrices(TOKENS);

  const [state, setState] = useState<State>(initialState);

  const setDummyAction = () => {};

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
      <dispatchCtx.Provider value={useMemo(() => ({ setDummyAction }), [])}>
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
