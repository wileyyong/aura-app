import React, { FC, useState } from 'react';

import { useAddress, useConnect } from '../../../context/AppProvider';
import { mediumAddress } from '../../../utils';
import { Link as RouterLink } from 'react-router-dom';
import { AccountModal } from '../Modals/AccountModal';
import { Button, Grid, Typography, Link, styled, Stack } from '@mui/material';

const HeaderTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.success.main,
  fontSize: '26px', // just testing
}));

export const Header: FC = () => {
  const connect = useConnect();
  const address = useAddress();
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
    >
      <Grid item>
        <Link component={RouterLink} to="/">
          <HeaderTitle>Aura</HeaderTitle>
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
                <Button onClick={handleOpen}>{mediumAddress(address)}</Button>
                <AccountModal open={open} onClose={handleClose} />
              </>
            ) : (
              <Button onClick={connect}>Connect Wallet</Button>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
