import React from 'react';
import { BigNumberish } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Stack, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '../Input';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  stakeAddress: string;
  onWithdraw?: (amount: BigNumberish) => void;
}

interface FormValues {
  amount: string;
}

export const WithdrawInput = ({
  label,
  buttonLabel,
  onWithdraw,
  stakeAddress,
}: DepositInputProps) => {
  const address = useAddress();
  const { data: balance } = useBalanceOf(stakeAddress, address);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = (values: FormValues) => {
    const amount = parseEther(values.amount);
    onWithdraw && onWithdraw(amount);
  };

  const handleMaxClick = () => {
    const value = formatEther(balance || 0);

    setValue('amount', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input label={label} onMaxClick={handleMaxClick} {...register('amount')} />
        <Button type="submit" variant="contained">
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
};
