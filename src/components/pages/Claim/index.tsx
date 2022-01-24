import React, { FC } from 'react';
import { Box } from '@mui/material';
import { Heading } from '../../shared/Heading';
import { Overview } from '../../shared/Overview';
import { ClaimAccordion } from '../../shared/AccordionInput/Claim';

export const Claim: FC = () => {
  return (
    <Box>
      <Overview />
      <Box my={4}>
        <Box mb={2}>
          <Heading title="Claim earnings" />
        </Box>
      </Box>
      <ClaimAccordion symbol={'Curve Pools'} />
    </Box>
  );
};
