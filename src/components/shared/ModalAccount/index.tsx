import React, { FC } from 'react';
import { Modal, Button, styled, Typography, Grid } from '@mui/material';

import {
  useAddress,
  useConnect,
  useDisconnect,
} from '../../../context/AppProvider';
import { mediumAddress } from '../../../utils';
import { ModalBox } from '../index';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const Address = styled('span')`
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  padding: 0.25rem;
  border-radius: 0.5rem;
`;

export const ModalAccount: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <HeaderTitle sx={{ mb: 1, pb: 1 }}>Account</HeaderTitle>
        {!!address ? (
          <Grid container direction="column" sx={{ py: 2 }}>
            <Grid item>
              <Typography variant={'subtitle1'}>
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
      </ModalBox>
    </Modal>
  );
};
