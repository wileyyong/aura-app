import React, { FC } from 'react';
import { Modal, Box, styled, Typography } from '@mui/material';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 1rem;
  padding: 1rem;
  text-align: center;
`;

export const PoolModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <StyledBox>
        <HeaderTitle sx={{ mb: 1, pb: 1 }}>Pool rewards</HeaderTitle>
        <p>Test</p>
      </StyledBox>
    </Modal>
  );
};
