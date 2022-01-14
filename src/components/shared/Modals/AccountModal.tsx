import React, { FC } from 'react';
import { Modal, Button, Box, styled, Typography, Grid } from '@mui/material';

import {
  useAddress,
  useConnect,
  useDisconnect,
} from '../../../context/AppProvider';
import { mediumAddress } from '../../../utils';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const Address = styled('span')`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  padding: 0.25rem;
  border-radius: 0.5rem;
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

export const AccountModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  return (
    <Modal open={open} onClose={onClose}>
      <StyledBox>
        <HeaderTitle sx={{ mb: 1, pb: 1 }}>Account</HeaderTitle>
        {!!address ? (
          <Grid container direction="column" sx={{ py: 2 }}>
            <Grid item>
              <Typography variant="subtitle1">
                Connected with <Address>{mediumAddress(address)}</Address>
              </Typography>
            </Grid>
            <br />
            <Button variant="contained" onClick={disconnect}>
              Disconnect
            </Button>
          </Grid>
        ) : (
          <Button onClick={connect}>Connect</Button>
        )}
      </StyledBox>
    </Modal>
  );
};
