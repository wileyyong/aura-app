import React, { FC } from 'react';
import { Box } from '@mui/material';
import { PoolsTable } from './PoolsTable';
import { ConvertAccordion } from '../../shared/AccordionInput/Convert';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';
import { Heading } from '../../shared/Heading';
import { Overview } from '../../shared/Overview';

export const Stake: FC = () => {
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  const apr = stakedCVXCRVAPR && {
    total: stakedCVXCRVAPR.total,
    crvApr: stakedCVXCRVAPR.crvAPR,
    cvxApr: stakedCVXCRVAPR.cvxAPR,
    threeApr: stakedCVXCRVAPR.threeAPR,
  };

  return (
    <Box>
      <Overview />
      <Box my={4}>
        <Box mb={2}>
          <Heading title="Convert BAL" />
        </Box>
        <ConvertAccordion share={0} symbol={'BAL'} apr={apr} />
      </Box>
      <Box mb={4}>
        <Heading title="Stake Balancer LP Tokens" />
        <PoolsTable />
      </Box>
    </Box>
  );
};
