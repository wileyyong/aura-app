import React from 'react';
import { Stack, Button, Box } from '@mui/material';

import { Input } from '../Input';

export interface DepositInputProps {
  label: string;
  buttonLabel: string;
}

export const DepositInput = ({ label, buttonLabel }: DepositInputProps) => {
  return (
    <Stack direction="row" spacing={2}>
      <Input label={label} onMaxClick={() => alert('max clicked')} />
      <Button variant="outlined">Approve</Button>
      <Button variant="contained">{buttonLabel}</Button>
    </Stack>
  );
};
