import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { ADDRESS } from '../../../constants';
import { useChainId } from '../../../context/AppProvider';

interface LockAccordionProps extends Omit<AccordionItemProps, 'details'> {}

export const LockAccordion = (props: LockAccordionProps) => {
  const chainId = useChainId();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = ADDRESS[chainId].cvx;
  const cvxLocker = ADDRESS[chainId].cvxLocker;

  return (
    <AccordionInput
      {...props}
      details={
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Lock" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput
              depositToken={cvxAddress}
              depositAddress={cvxLocker}
              label={`Amount of ${props.symbol} to lock`}
              buttonLabel={`Lock ${props.symbol}`}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Info...
          </TabPanel>
        </>
      }
    />
  );
};
