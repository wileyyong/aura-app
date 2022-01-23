import React, { FC, createContext, useEffect, useMemo, useContext, useState } from 'react';
import { useProvider } from './AppProvider';
import { useContracts } from './ContractProvider';

interface State {
  initialised: boolean;
  crv?: string;
}

interface Dispatch {
  setDummyAction?: () => void;
}

const initialState = {
  initialised: false,
};

const stateCtx = createContext<State>(null as never);
const dispatchCtx = createContext<Dispatch>(null as never);

export const DataProvider: FC = ({ children }) => {
  const provider = useProvider();
  const contracts = useContracts();

  const [state, setState] = useState<State>(initialState);

  const setDummyAction = () => {};

  useEffect(() => {
    (async () => {
      if (!provider || state.initialised) return;
      try {
        const crv = await contracts.crvDepositor?.crv();

        const newState = {
          ...state,
          initialised: true,
          crv,
        };

        setState(newState);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [contracts, provider, state]);

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

export const useDataDispatch = (): Dispatch => useContext(dispatchCtx);
