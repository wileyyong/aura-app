import React, { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { AccordionItem } from '../../shared/AccordionItem';
import useLockedCVXAPR from '../../../hooks/useLockedCVXAPR';
import useStakedCVXAPR from '../../../hooks/useStakedCVXAPR';

export const Lock: FC = () => {
  const { data: stakedCVXAPR } = useStakedCVXAPR();
  const lockedCVXAPR = useLockedCVXAPR();

  return (
    <Box>
      <Box mb={4}>
        <Box mb={2}>
          <Typography variant="h6">Lock AURA</Typography>
        </Box>
        <AccordionItem
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
        <AccordionItem
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
