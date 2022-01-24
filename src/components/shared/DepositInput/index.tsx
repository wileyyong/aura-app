import React, {useState} from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Stack, Button } from '@mui/material';

import { Input } from '../Input';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import { useAddress } from '../../../context/AppProvider';
import { useAllowance } from '../../../hooks/useAllowance';
import { formatEther } from 'ethers/lib/utils';
import { ethers } from 'ethers';

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
    console.log(values);
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
