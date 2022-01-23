import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import { Input } from '../Input';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';
import { useAllowance } from '../../../hooks/useAllowance';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  depositToken: string;
  depositAddress: string;
}

interface FormValues {
  amount: number;
}

export const DepositInput = ({
  label,
  buttonLabel,
  depositToken,
  depositAddress,
}: DepositInputProps) => {
  const address = useAddress();
  const { data: balance } = useBalanceOf(depositToken, address);
  const { data: allowance } = useAllowance(depositToken, address, depositAddress);

  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = values => {
    console.log(values);
  };

  const handleMaxClick = () => {
    setValue('amount', Number(balance?.toString() || '0'), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input label={label} onMaxClick={handleMaxClick} {...register('amount')} />
        <Button variant="outlined" disabled={!allowance?.lte('0')}>
          Approve
        </Button>
        <Button variant="contained" type="submit">
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
};
