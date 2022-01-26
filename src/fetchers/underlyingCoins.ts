import { ethers, Signer } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { Registry__factory } from '../typechain';

export default async function underlyingCoins(
  registryAddress: string,
  contractAddress: string,
  signer: Signer | Web3Provider,
) {
  const registry = Registry__factory.connect(registryAddress, signer);

  const underlying = await registry.get_underlying_coins(contractAddress);

  return underlying.filter(
    x => ethers.BigNumber.from(x).gt('0') && x !== '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
  );
}
