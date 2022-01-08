import React, {
  FC,
  createContext,
  useEffect,
  useMemo,
  useContext,
  useState,
} from 'react';
import { CrvDepositor__factory } from '../typechain/factories/CrvDepositor__factory';
import { useAddress, useSigner } from './AppProvider';

interface State {
  initialised: boolean;
  crv?: string;
}

interface Dispatch {}

const initialState = {
  initialised: false,
};

const stateCtx = createContext<State>(null as never);
const dispatchCtx = createContext<Dispatch>(null as never);

export const DataProvider: FC = ({ children }) => {
  const signer = useSigner();
  const address = useAddress();

  const [state, setState] = useState<State>(initialState);

  useEffect(() => {
    (async () => {
      if (!signer || !address || state.initialised) return;
      try {
        const contract = CrvDepositor__factory.connect(
          '0x8014595F2AB54cD7c604B00E9fb932176fDc86Ae',
          signer,
        );
        const crv = await contract.crv();
        // ...
        const state = {
          initialised: true,
          crv,
        };

        setState(state);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [address, signer, state]);

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
