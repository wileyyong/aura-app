export const DEPLOYED_ADDRESS = '';

interface Contracts {
  multicall: string;
}

export const ADDRESS: { [key: number]: Contracts } = {
  1: {
    multicall: '0xeefba1e63905ef1d7acba5a8513c70307c1ce441',
  },
};

export const MAX_GAS_LIMIT: { [key: number]: number } = {
  1: 30000000,
};

export const COIN_GECKO_IDS = [];
