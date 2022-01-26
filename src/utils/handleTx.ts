import { ContractTransaction } from 'ethers';

export const handleTx = async (
  fn: () => Promise<ContractTransaction> | undefined,
  onComplete?: () => void,
) => {
  try {
    // TODO: toasts or summin
    const tx = await fn();

    if (!tx) return;

    await tx.wait();
    alert('success');
  } catch (error) {
    console.log(error);
    alert('failure');
  } finally {
    onComplete && onComplete();
  }
};
