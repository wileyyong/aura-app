import { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { TabPanel } from '../TabPanel';

interface ConvertAccordionProps
  extends Omit<AccordionItemProps, 'details'> {}

export const ConvertAccordion = (props: ConvertAccordionProps) => {
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
              <Tab label="Convert" />
              <Tab label="Unstake" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput
              label="Amount of AURA to convert"
              buttonLabel="Convert & Stake"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <WithdrawInput
              label="Amount of auraBAL to withdraw"
              buttonLabel="Unstake auraBAL"
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
