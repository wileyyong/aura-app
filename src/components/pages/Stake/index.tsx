import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { AccordionItem } from '../../shared/AccordionItem';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';

export const Stake: FC = () => {
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  return (
    <Box>
      <Box>
        <Box mb={2}>
          <Typography variant="h6">Convert BAL</Typography>
        </Box>
        <AccordionItem
          poolId={0}
          symbol={'AURA'}
          apr={stakedCVXCRVAPR}
          share={0}
          expanded={true}
        />
      </Box>
      <Box mt={4}>
        <Typography variant="h6">Stake Balancer LP Tokens</Typography>
        <PoolsTable />
      </Box>
    </Box>
  );
};
