import React from 'react';
import { BigNumberish, ContractTransaction } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { Stack, Button } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '../Input';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';
import { handleTx } from '../../../utils/handleTx';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  stakeAddress: string;
  onWithdraw?: (amount: BigNumberish) => Promise<ContractTransaction> | undefined;
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
  const { data: balance, mutate: updateBalance } = useBalanceOf(stakeAddress, address);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = (values: FormValues) => {
    const amount = parseEther(values.amount);
    onWithdraw &&
      handleTx(
        () => {
          return onWithdraw(amount);
        },
        () => {
          updateBalance();
        },
      );
  };

  const handleMaxClick = () => {
    const value = formatEther(balance || 0);

    setValue('amount', value, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  const validate = (value: string) => {
    if (value === '') return 'amount is required';
    if (Number(value) <= 0) return 'amount must be greater than 0';
    return true;
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input
          error={!!errors?.amount?.message}
          helperText={errors?.amount?.message}
          label={label}
          onMaxClick={handleMaxClick}
          {...register('amount', { validate })}
        />
        <Stack direction="row" spacing={2} sx={{ height: '40px' }}>
          <Button type="submit" variant="contained">
            {buttonLabel}
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
