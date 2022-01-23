import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { ConvertAccordion } from '../../shared/AccordionInput/Convert';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';
import { HeaderBox } from './HeaderBox';
import { useUserRewards } from '../../../hooks/useUserRewards';

export const Stake: FC = () => {
  const userRewards = useUserRewards();

  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  return (
    <Box>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          <HeaderBox
            title="Total Claimable"
            value={`$${(userRewards?.totalUSD ?? 0).toFixed(2)}`}
          />
        </Grid>
        <Grid item>
          <HeaderBox title="Total Deposits" value="$0" />
        </Grid>
      </Grid>
      <Box my={4}>
        <Box mb={2}>
          <Typography variant="h6">Convert BAL</Typography>
        </Box>
        <ConvertAccordion
          highlighted
          share={0}
          poolId={0}
          symbol={'BAL'}
          expanded={true}
          apr={stakedCVXCRVAPR}
        />
      </Box>
      <Box mb={4}>
        <Typography variant="h6">Stake Balancer LP Tokens</Typography>
        <PoolsTable />
      </Box>
    </Box>
  );
};
