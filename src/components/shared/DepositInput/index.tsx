import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import { Input } from '../Input';
import { BigNumber } from 'ethers';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
  max?: BigNumber;
}

interface FormValues {
  amount: number;
}

export const DepositInput = ({ label, max, buttonLabel }: DepositInputProps) => {
  const { register, handleSubmit, setValue } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = values => {
    console.log(values);
  };

  const handleMaxClick = () => {
    setValue('amount', Number(max?.toString() || '0'), {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input label={label} onMaxClick={handleMaxClick} {...register('amount')} />
        <Button variant="outlined">Approve</Button>
        <Button variant="contained" type="submit">
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
};
