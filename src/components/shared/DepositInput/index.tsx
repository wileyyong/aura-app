import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { BigNumber, BigNumberish, ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '../Input';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';
import { useAllowance } from '../../../hooks/useAllowance';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  depositToken: string;
  depositAddress: string;
  onDeposit?: (amount: BigNumberish) => void;
}

interface FormValues {
  amount: number;
}

export const DepositInput = ({
  label,
  onDeposit,
  buttonLabel,
  depositToken,
  depositAddress,
}: DepositInputProps) => {
  const address = useAddress();
  const [loading, setLoading] = useState(false);

  const {
    data: allowance,
    mutate: updateAllowance,
    approve,
  } = useAllowance(depositToken, address, depositAddress);
  const { data: balance } = useBalanceOf(depositToken, address);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = values => {
    const amount = parseEther(values.amount.toString());
    onDeposit && onDeposit(amount);
  };

  const handleMaxClick = () => {
    const value = Number(formatEther(balance || 0));

    setValue('amount', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const handleApprove = async () => {
    setLoading(true);
    await approve(depositAddress, ethers.constants.MaxUint256);
    await updateAllowance();
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input label={label} onMaxClick={handleMaxClick} {...register('amount')} />
        <Button
          variant="outlined"
          onClick={handleApprove}
          disabled={!allowance?.lte('0') || loading}
        >
          Approve
        </Button>
        <Button variant="contained" type="submit" disabled={allowance?.lte('0') || loading}>
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
};
