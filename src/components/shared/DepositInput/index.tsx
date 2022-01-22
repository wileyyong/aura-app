import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import { Input } from '../Input';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
}

interface FormValues {
  amount: number;
}

export const DepositInput = ({ label, buttonLabel }: DepositInputProps) => {
  const { register, handleSubmit } = useForm<FormValues>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const submit: SubmitHandler<FormValues> = values => {
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Stack direction="row" spacing={2}>
        <Input label={label} onMaxClick={() => alert('max clicked')} {...register('amount')} />
        <Button variant="outlined">Approve</Button>
        <Button variant="contained" type="submit">
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
};
