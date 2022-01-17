export const DEPLOYED_ADDRESS = '';

export const DEFAULT_CHAIN_ID = 1;

interface Contracts {
  multicall: string;
  cvx: string;
  crv: string;
  crvDepositer: string;
  cvxCRV: string;
  cvxLocker: string;
  booster: string;
  registry: string;
}

export const ADDRESS: { [key: number]: Contracts } = {
  1: {
    multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    cvx: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
    crv: '0xD533a949740bb3306d119CC777fa900bA034cd52',
    crvDepositer: '0x8014595F2AB54cD7c604B00E9fb932176fDc86Ae',
    cvxCRV: '0x62B9c7356A2Dc64a1969e19C23e4f579F9810Aa7',
    cvxLocker: '0xD18140b4B819b895A3dba5442F959fA44994AF50',
    booster: '0xF403C135812408BFbE8713b5A23a04b3D48AAE31',
    registry: '0x90E00ACe148ca3b23Ac1bC8C240C2a7Dd9c2d7f5',
  },
};

export const MAX_GAS_LIMIT: { [key: number]: number } = {
  1: 30000000,
};

export const COIN_GECKO_IDS = [];

export const ALCHEMY_URL =
  'https://eth-mainnet.alchemyapi.io/v2/ZleB0te5a-wfQW12hzF27wfEGVRKvwwB';

export const RPC_URLS: { [key: number]: string } = {
  1: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
  3: 'https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
};
