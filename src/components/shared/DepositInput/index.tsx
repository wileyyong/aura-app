import React, { useState } from 'react';
import { Stack, Button } from '@mui/material';
import { BigNumberish, ContractTransaction, ethers } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { useForm, SubmitHandler } from 'react-hook-form';

import { Input } from '../Input';
import { handleTx } from '../../../utils/handleTx';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';
import { useAllowance } from '../../../hooks/useAllowance';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  depositToken: string;
  depositAddress: string;
  onDeposit?: (amount: BigNumberish) => Promise<ContractTransaction> | undefined;
}

interface FormValues {
  amount: string;
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
  const { data: balance, mutate: updateBalance } = useBalanceOf(depositToken, address);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = values => {
    const amount = parseEther(values.amount);
    onDeposit &&
      handleTx(
        () => {
          return onDeposit(amount);
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

  const handleApprove = async () => {
    setLoading(true);
    await approve(depositAddress, ethers.constants.MaxUint256);
    await updateAllowance();
    setLoading(false);
  };

  const validate = (value: string) => {
    if (value === '') return 'amount is required';
    if (Number(value) <= 0) return 'amount must be greater than 0';
    return false;
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
        <Stack direction="row" spacing={2}>
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
      </Stack>
    </form>
  );
};
