import React from 'react';
import { styled, TextField, Button } from '@mui/material';

interface InputProps {
  onMaxClick: any;
  label: string;
}

const TextFieldWrapper = styled('div')`
  position: relative;
`;

const MaxButton = styled(Button)`
  position: absolute;
  right: 5px;
  top: 5px;
`;

export const Input = ({ onMaxClick, label }: InputProps) => {
  return (
    <TextFieldWrapper>
      <TextField
        sx={{ minWidth: '380px' }}
        InputLabelProps={{ shrink: true }}
        size="small"
        label={label}
        variant="outlined"
      />
      {onMaxClick && (
        <MaxButton onClick={onMaxClick} size="small" variant="contained">
          Max
        </MaxButton>
      )}
    </TextFieldWrapper>
  );
};
