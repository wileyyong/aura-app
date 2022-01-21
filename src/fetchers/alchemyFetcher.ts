import { ALCHEMY_URL } from '../constants';

export default async function alchemyFetcher(fetchParams: (string | { [key: string]: string })[]) {
  const params = {
    jsonrpc: '2.0',
    method: 'eth_call',
    params: fetchParams,
    id: 1,
  };

  const resp = await fetch(ALCHEMY_URL, {
    method: 'POST',
    body: JSON.stringify(params),
  });

  const data = await resp.json();

  return data;
}
