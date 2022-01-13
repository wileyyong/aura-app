import useMulticall, { Call } from './useMulticall';
import { ADDRESS } from '../constants';

import {
  Booster__factory,
  Erc20__factory,
  Registry__factory,
} from '../typechain';
import { useChainId } from '../context/AppProvider';
import useSWR from 'swr';

const boosterItf = Booster__factory.createInterface();
const registryItf = Registry__factory.createInterface();
const erc20Itf = Erc20__factory.createInterface();

export interface Pool {
  poolId: number;
  symbol: string;
  lptoken: string;
  token: string;
  gauge: string;
  swap: string;
  crvRewards: string;
  shutdown: boolean;
  stash: string;
}

async function fetchPools(
  _: string,
  chainId: number,
  poolIds: string[],
  boosterMulticall: (call: Call[]) => Promise<
    | undefined
    | {
        lptoken: string;
        token: string;
        gauge: string;
        crvRewards: string;
        stash: string;
        shutdown: boolean;
      }[]
  >,
  erc20Multicall: (call: Call[]) => Promise<undefined | [string][]>,
  registryMulticall: (call: Call[]) => Promise<undefined | [string][]>,
) {
  const boosterAddress = ADDRESS[chainId].booster;
  const registryAddress = ADDRESS[chainId].registry;

  const poolInfoCalls = poolIds.map(pid => ({
    address: boosterAddress,
    name: 'poolInfo',
    params: [pid],
  }));

  const boosterResp = await boosterMulticall(poolInfoCalls);

  if (!boosterResp) return;

  const erc20Calls = boosterResp.map(pool => ({
    address: pool.lptoken,
    name: 'symbol',
    params: [],
  }));

  const symbolResp = await erc20Multicall(erc20Calls);

  if (!symbolResp) return;

  const registryCalls = boosterResp.map(pool => ({
    address: registryAddress,
    name: 'get_pool_from_lp_token',
    params: [pool.lptoken],
  }));

  const registryResp = await registryMulticall(registryCalls);

  if (!registryResp) return;

  const data = boosterResp.map((x, i) => ({
    poolId: i,
    symbol: symbolResp[i][0],
    lptoken: x.lptoken,
    token: x.token,
    gauge: x.gauge,
    swap: registryResp[i][0],
    crvRewards: x.crvRewards,
    shutdown: x.shutdown,
    stash: x.stash,
  }));

  return data;
}

export default function usePoolInfo(poolIds: string[]) {
  const chainId = useChainId();

  const boosterMulticall = useMulticall(boosterItf);
  const erc20Multicall = useMulticall(erc20Itf);
  const registryMulticall = useMulticall(registryItf);

  return useSWR(
    [
      'poolInfo',
      chainId,
      poolIds,
      boosterMulticall,
      erc20Multicall,
      registryMulticall,
    ],
    fetchPools,
  );
}
