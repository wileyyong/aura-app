import useSWR from 'swr';

import { COIN_GECKO_IDS } from '../constants';

const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${COIN_GECKO_IDS.join(
  ',',
)}`;

async function fetchCoinGeckoPrices() {
  const resp = await fetch(coinGeckoUrl);
  const data = await resp.json();
  return data;
}

export default function useCoinGeckoPrices() {
  return useSWR('coinGeckoPrices', fetchCoinGeckoPrices);
}
