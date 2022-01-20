import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { LockAccordion } from '../../shared/AccordionInput/Lock';
import { StakeAccordion } from '../../shared/AccordionInput/Stake';
import { useLockedCVXAPR } from '../../../hooks/useLockedCVXAPR';
import { useStakedCVXAPR } from '../../../hooks/useStakedCVXAPR';

export const Lock: FC = () => {
  const stakedCVXAPR = useStakedCVXAPR();
  const lockedCVXAPR = useLockedCVXAPR();

  return (
    <Box>
      <Box mb={4}>
        <Box mb={2}>
          <Typography variant="h6">Lock AURA</Typography>
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
          <Typography variant="h6">Stake your AURA to earn auraBAL</Typography>
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
