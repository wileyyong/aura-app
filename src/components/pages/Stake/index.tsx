import React, { FC } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { ConvertAccordion } from '../../shared/AccordionInput/Convert';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';
import { HeaderBox } from './HeaderBox';
import { useUserRewards } from '../../../hooks/useUserRewards';

export const Stake: FC = () => {
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();
  const userRewards = useUserRewards();

  return (
    <Box>
      <Grid container direction="row" justifyContent="center" spacing={2}>
        <Grid item>
          <HeaderBox title="Total Claimable" value={`$${userRewards?.totalUSD?.toFixed(2)}`} />
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
          poolId={0}
          symbol={'BAL'}
          apr={stakedCVXCRVAPR}
          share={0}
          expanded={true}
        />
      </Box>
      <Box mb={4}>
        <Typography variant="h6">Stake Balancer LP Tokens</Typography>
        <PoolsTable />
      </Box>
    </Box>
  );
};
