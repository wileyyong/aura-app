import React, {
  FC,
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers';

import { Signer } from 'ethers';
import { DEFAULT_CHAIN_ID, RPC_URLS } from '../constants';

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
        rpc: {
          1: RPC_URLS[1],
          3: RPC_URLS[3],
        },
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
  provider?: Web3Provider | JsonRpcProvider;
  chainId: number;
  signer?: Signer;
  connect(): void;
  disconnect(): void;
}

const context = createContext<State>({} as never);

const parseChainId = (chainId: number) => parseInt((chainId ?? 0x1).toString());

/**
 * Provider for global App state and interactions.
 */
export const AppProvider: FC = ({ children }) => {
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [chainId, setChainId] = useState<number>(DEFAULT_CHAIN_ID);
  const [web3ModalProvider, setWeb3ModalProvider] = useState<any | null>(null);
  const [provider, setProvider] = useState<Web3Provider | JsonRpcProvider | undefined>(
    new JsonRpcProvider(RPC_URLS[DEFAULT_CHAIN_ID]),
  );

  const handleAddressChange = useCallback((address: string[]) => setAddress(address?.[0]), []);

  const handleChainIdChange = useCallback(
    (chainId: number) => setChainId(parseChainId(chainId)),
    [],
  );

  const connect = useCallback(async () => {
    const provider = await lazyLaunchModal();
    setWeb3ModalProvider(provider);
    setProvider(new Web3Provider(provider));
    setAddress(provider?.selectedAddress);
  }, []);

  const disconnect = useCallback(() => {
    setWeb3ModalProvider(null);
    setAddress(undefined);
  }, []);

  // Update chainID
  useEffect(() => {
    const parsedChainId = parseChainId(web3ModalProvider?.chainId);
    if (chainId !== parsedChainId) {
      setChainId(parsedChainId);
    }
  }, [web3ModalProvider, chainId]);

  // Subscribe to web3modal events
  useEffect(() => {
    if (web3ModalProvider !== null && web3ModalProvider.on) {
      web3ModalProvider.on('accountsChanged', handleAddressChange);
      web3ModalProvider.on('chainChanged', handleChainIdChange);
    }
    return () => {
      if (web3ModalProvider?.off) {
        web3ModalProvider.off('accountsChanged', handleAddressChange);
        web3ModalProvider.off('chainChanged', handleChainIdChange);
      }
    };
  }, [web3ModalProvider, handleAddressChange, handleChainIdChange]);

  const signer = provider?.getSigner();

  const value = useMemo(
    () => ({
      provider,
      chainId,
      address,
      signer,
      connect,
      disconnect,
    }),
    [provider, address, signer, chainId, connect, disconnect],
  );

  return <context.Provider value={value}>{children}</context.Provider>;
};

export const useChainId = (): State['chainId'] => useContext(context).chainId;

export const useProvider = (): State['provider'] => useContext(context).provider;

export const useConnect = (): State['connect'] => useContext(context).connect;

export const useDisconnect = (): State['disconnect'] => useContext(context).disconnect;

export const useAddress = (): State['address'] => useContext(context).address?.toLowerCase();

export const useSigner = (): State['signer'] => useContext(context).signer;
