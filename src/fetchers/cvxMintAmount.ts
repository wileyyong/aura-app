import { ethers } from 'ethers';

export default function cvxMintAmount(
  crvEarned: number,
  {
    reductionPerCliff,
    totalCliffs,
    totalSupply,
    maxSupply,
  }: { [key: string]: ethers.BigNumber },
) {
  const currentCliff = totalSupply.div(reductionPerCliff);
  const currentCliffN = Number(currentCliff.toString());
  const totalCliffsN = Number(totalCliffs.toString());

  if (currentCliffN >= totalCliffsN) {
    return 0;
  }

  const remaining = totalCliffsN - currentCliffN;
  const cvxEarned = (crvEarned * remaining) / totalCliffsN;

  const maxSupplyN = Number(maxSupply.toString());
  const totalSupplyN = Number(totalSupply.toString());

  if (cvxEarned > maxSupplyN - totalSupplyN) {
    return maxSupplyN - totalSupplyN;
  }

  return cvxEarned;
}
