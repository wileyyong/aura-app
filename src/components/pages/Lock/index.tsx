import React, { FC } from 'react';
import { Box } from '@mui/material';
import { LockAccordion } from '../../shared/AccordionInput/Lock';
import { StakeAccordion } from '../../shared/AccordionInput/Stake';
import { useLockedCVXAPR } from '../../../hooks/useLockedCVXAPR';
import { useStakedCVXAPR } from '../../../hooks/useStakedCVXAPR';
import { Heading } from '../../shared/Heading';

export const Lock: FC = () => {
  const stakedCVXAPR = useStakedCVXAPR();
  const lockedCVXAPR = useLockedCVXAPR();

  const stakedApr = stakedCVXAPR && {
    total: { label: 'Total vAPR', value: stakedCVXAPR.total },
  };

  const lockedApr = lockedCVXAPR && {
    total: { label: 'Total vAPR', value: lockedCVXAPR.total },
  };

  return (
    <Box>
      <Box mb={4}>
        <Box mb={2}>
          <Heading title="Lock Aura" />
        </Box>
        <LockAccordion symbol={'Locked AURA'} apr={lockedApr} share={0} />
      </Box>
      <Box mb={4}>
        <Box mb={2}>
          <Heading title="Stake your AURA to earn auraBAL" />
        </Box>
        <StakeAccordion symbol={'AURA'} apr={stakedApr} share={0} />
      </Box>
    </Box>
  );
};
