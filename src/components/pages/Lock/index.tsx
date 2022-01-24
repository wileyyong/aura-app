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

  return (
    <Box>
      <Box mb={4}>
        <Box mb={2}>
          <Heading title="Lock Aura" />
        </Box>
        <LockAccordion
          highlighted
          poolId={0}
          symbol={'Locked AURA'}
          apr={lockedCVXAPR}
          share={0}
          expanded={true}
        />
      </Box>
      <Box mb={4}>
        <Box mb={2}>
          <Heading title="Stake your AURA to earn auraBAL" />
        </Box>
        <StakeAccordion
          highlighted
          poolId={0}
          symbol={'AURA'}
          apr={stakedCVXAPR}
          share={0}
          expanded={true}
        />
      </Box>
    </Box>
  );
};
