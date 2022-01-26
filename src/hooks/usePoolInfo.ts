import useSWR from 'swr';
import { BigNumber } from 'ethers';

import { Booster__factory, Erc20__factory, Registry__factory } from '../typechain';
import useMulticall, { Call } from './useMulticall';
import { useAddresses } from './useAddresses';

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
  lptokenTotalSupply: BigNumber;
  tokenTotalSupply: BigNumber;
}

async function fetchPools(
  _: string,
  boosterAddress: string,
  registryAddress: string,
  poolIds: string[],
  boosterMulticall: (call: Call[] | Array<Call[]>) => Promise<
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
  erc20Multicall: (
    call: Call[] | Array<Call[]>,
  ) => Promise<undefined | [string][][] | [BigNumber][][]>,
  registryMulticall: (call: Call[] | Array<Call[]>) => Promise<undefined | [string][]>,
) {
  const poolInfoCalls = poolIds.map(pid => ({
    address: boosterAddress,
    name: 'poolInfo',
    params: [pid],
  }));

  const boosterResp = await boosterMulticall(poolInfoCalls);

  if (!boosterResp) return;

  const erc20Calls = boosterResp.map(pool => [
    {
      address: pool.lptoken,
      name: 'symbol',
      params: [],
    },
    {
      address: pool.lptoken,
      name: 'totalSupply',
      params: [],
    },
    {
      address: pool.token,
      name: 'totalSupply',
      params: [],
    },
  ]);

  const symbolResp = await erc20Multicall(erc20Calls);

  if (!symbolResp) return;

  const registryCalls = boosterResp.map(pool => ({
    address: registryAddress,
    name: 'get_pool_from_lp_token',
    params: [pool.lptoken],
  }));

  const registryResp = await registryMulticall(registryCalls);

  if (!registryResp) return;

  const data: Pool[] = boosterResp.map((x, i) => ({
    poolId: Number(poolIds[i]),
    symbol: symbolResp[i]?.[0]?.[0] as string,
    lptoken: x.lptoken,
    token: x.token,
    gauge: x.gauge,
    swap: registryResp[i][0],
    crvRewards: x.crvRewards,
    shutdown: x.shutdown,
    stash: x.stash,
    lptokenTotalSupply: symbolResp[i]?.[1]?.[0] as BigNumber,
    tokenTotalSupply: symbolResp[i]?.[2]?.[0] as BigNumber,
  }));

  return data;
}

export default function usePoolInfo(poolIds: string[]) {
  const addresses = useAddresses();

  const boosterAddress = addresses.booster;
  const registryAddress = addresses.registry;

  const boosterMulticall = useMulticall(boosterItf);
  const erc20Multicall = useMulticall(erc20Itf);
  const registryMulticall = useMulticall(registryItf);

  return useSWR(
    [
      'poolInfo',
      boosterAddress,
      registryAddress,
      poolIds,
      boosterMulticall,
      erc20Multicall,
      registryMulticall,
    ],
    fetchPools,
  );
}
