import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { AccordionItem } from '../../shared/AccordionItem';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';

export const Stake: FC = () => {
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  return (
    <Box>
      <Box mb={4}>
        <Box mb={2}>
          <Typography variant="h6">Convert BAL</Typography>
        </Box>
        <AccordionItem
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
