import React, { FC, useState } from 'react';

import { useAddress, useConnect, useChainId } from '../../../context/AppProvider';
import { mediumAddress } from '../../../utils';
import { Link as RouterLink } from 'react-router-dom';
import { ModalAccount } from '../ModalAccount';
import { Button, Grid, Typography, Link, styled, Stack } from '@mui/material';

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
}));

export const Header: FC = () => {
  const connect = useConnect();
  const address = useAddress();
  const chainId = useChainId();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 2, py: 2 }}
    >
      <Grid item>
        <Link component={RouterLink} to="/">
          <HeaderTitle sx={{ typography: 'h5' }}>Aura</HeaderTitle>
        </Link>
      </Grid>
      <Grid item>
        <Grid container spacing={2} direction="row" alignItems="center">
          <Grid item>
            <Stack direction="row" spacing={2}>
              <Link component={RouterLink} to="/stake" variant="body1">
                Stake
              </Link>
              <Link component={RouterLink} to="/claim" variant="body1">
                Claim
              </Link>
              <Link component={RouterLink} to="/lock" variant="body1">
                Lock
              </Link>
            </Stack>
          </Grid>
          <Grid item>
            {address ? (
              <>
                <Button variant="outlined" onClick={handleOpen}>
                  {mediumAddress(address)} [{chainId}]
                </Button>
                <ModalAccount open={open} onClose={handleClose} />
              </>
            ) : (
              <Button variant="contained" onClick={connect}>
                Connect Wallet
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
