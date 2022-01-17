import React, { FC } from 'react';
import { Box } from '@mui/material';
import { AccordionItem } from '../../shared/AccordionItem';
import useLockedCVXAPR from '../../../hooks/useLockedCVXAPR';

export const Lock: FC = () => {
  const lockedCVXAPR = useLockedCVXAPR();

  return (
    <Box>
      <Box>
        <AccordionItem
          poolId={0}
          symbol={'Locked AURA'}
          apr={lockedCVXAPR}
          share={0}
          expanded={true}
        />
      </Box>
    </Box>
  );
};
