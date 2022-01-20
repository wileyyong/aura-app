import { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { TabPanel } from '../TabPanel';

interface StakeBalLpAccordionProps
  extends Omit<AccordionItemProps, 'details'> {}

export const StakeBalLpAccordion = (props: StakeBalLpAccordionProps) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  return (
    <AccordionInput
      {...props}
      details={
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Deposit" />
              <Tab label="Withdraw" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput
              label={`Amount to ${props.symbol} to deposit and stake`}
              buttonLabel="Deposit & Stake"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <WithdrawInput
              label={`Amount to ${props.symbol} to unstake and withdraw`}
              buttonLabel="Unstake & Withdraw"
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
