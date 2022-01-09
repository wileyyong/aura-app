import React, {
  FC,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { Web3Provider } from '@ethersproject/providers';

import { Signer } from 'ethers';

async function lazyLaunchModal() {
  const [WalletConnectProvider, Web3Modal] = await Promise.all([
    import('@walletconnect/web3-provider'),
    import('web3modal'),
  ]);

  const providerOptions = {
    injected: {
      display: {
        description: 'Connect with a browser extension',
      },
      package: null,
    },
    walletconnect: {
      package: WalletConnectProvider.default,
      options: {
        infuraId: '',
      },
      display: {
        description: 'Scan with a wallet to connect',
      },
    },
  };

  const web3Modal = new Web3Modal.default({
    cacheProvider: true,
    providerOptions,
  });

  return web3Modal.connect();
}

export interface State {
  address?: string;
  provider?: Web3Provider;
  signer?: Signer;
  connect(): void;
  disconnect(): void;
}

const context = createContext<State>({} as never);

/**
 * Provider for global App state and interactions.
 */
export const AppProvider: FC = ({ children }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [provider, setProvider] = useState<Web3Provider | undefined>(undefined);

  const connect = useCallback(async () => {
    const provider = await lazyLaunchModal();
    setProvider(new Web3Provider(provider));
    setAddress(provider?.selectedAddress);
  }, []);

  const disconnect = useCallback(() => {
    setProvider(undefined);
    setAddress(undefined);
  }, []);

  const signer = provider?.getSigner();

  const value = useMemo(
    () => ({
      provider,
      address,
      signer,
      connect,
      disconnect,
    }),
    [provider, address, signer, connect, disconnect],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useProvider = (): State['provider'] =>
  useContext(context).provider;

export const useConnect = (): State['connect'] => useContext(context).connect;

export const useDisconnect = (): State['disconnect'] =>
  useContext(context).disconnect;

export const useAddress = (): State['address'] =>
  useContext(context).address?.toLowerCase();

export const useSigner = (): State['signer'] => useContext(context).signer;
