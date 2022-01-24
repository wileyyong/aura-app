import { ContractTransaction } from 'ethers';

export const handleTx = async (fn: () => Promise<ContractTransaction>) => {
  try {
    // TODO: toasts or summin
    const tx = await fn();
    await tx.wait();
    alert('success');
  } catch (error) {
    alert('failure');
  }
};
