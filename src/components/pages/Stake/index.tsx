import React, { FC } from 'react';
import { Box } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { ConvertAccordion } from '../../shared/AccordionInput/Convert';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';
import { Heading } from '../../shared/Heading';
import { Overview } from '../../shared/Overview';

export const Stake: FC = () => {
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  return (
    <Box>
      <Overview />
      <Box my={4}>
        <Box mb={2}>
          <Heading title="Convert BAL" />
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
        <Heading title="Stake Balancer LP Tokens" />
        <PoolsTable />
      </Box>
    </Box>
  );
};
