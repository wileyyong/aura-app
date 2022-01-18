import React from 'react';
import { Stack, Button } from '@mui/material';

import { Input } from '../Input';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
}

export const WithdrawInput = ({ label, buttonLabel }: DepositInputProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Input label={label} onMaxClick={() => alert('max clicked')} />
      <Button variant="contained">{buttonLabel}</Button>
    </Stack>
  );
};
