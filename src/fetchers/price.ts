/*
 * NOTES
 * get_underlying_coins(address)
 * returns coins that underly and LP (swapContract)
 * we can then get the USD value of the underlying pool from
 * CG
 */
const coinGeckoUrl = 'https://api.coingecko.com/api/v3';

export const getPrices = async (
  contractAddresses: string[],
  currency = 'USD',
): Promise<Record<string, { usd: number }>> => {
  const url =
    coinGeckoUrl +
    '/simple/token_price/ethereum?contract_addresses=' +
    contractAddresses.join(',') +
    '&vs_currencies=' +
    currency;

  const resp = await fetch(url);
  const data = await resp.json();

  return data;
};

export const getAveragePrice = async (contractAddresses: string[], currency = 'USD') => {
  const data = await getPrices(contractAddresses);

  const [priceSum, c] = Object.keys(data).reduce(
    ([sum, count], key) => {
      const p = data[key]?.[currency.toLowerCase() as 'usd'] || 0;
      if (p > 0) {
        return [sum + p, count + 1];
      }
      return [sum, count];
    },
    [0, 0],
  );

  return priceSum / c;
};
