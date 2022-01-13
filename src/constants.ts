export const DEPLOYED_ADDRESS = '';

interface Contracts {
  multicall: string;
  cvx: string;
  crv: string;
}

export const ADDRESS: { [key: number]: Contracts } = {
  1: {
    multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
    cvx: '0x4e3FBD56CD56c3e72c1403e103b45Db9da5B9D2B',
    crv: '0xD533a949740bb3306d119CC777fa900bA034cd52',
  },
};

export const MAX_GAS_LIMIT: { [key: number]: number } = {
  1: 30000000,
};

export const COIN_GECKO_IDS = [];

export const ALCHEMY_URL =
  'https://eth-mainnet.alchemyapi.io/v2/ZleB0te5a-wfQW12hzF27wfEGVRKvwwB';
