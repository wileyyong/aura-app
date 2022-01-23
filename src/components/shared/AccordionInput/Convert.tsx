import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { useChainId } from '../../../context/AppProvider';
import { ADDRESS } from '../../../constants';

interface ConvertAccordionProps extends Omit<AccordionItemProps, 'details'> {}

export const ConvertAccordion = (props: ConvertAccordionProps) => {
  const chainId = useChainId();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const depositToken = ADDRESS[chainId].crv;
  const depositAddress = ADDRESS[chainId].crvDepositor;

  return (
    <AccordionInput
      {...props}
      details={
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Convert" />
              <Tab label="Unstake" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput
              depositToken={depositToken}
              depositAddress={depositAddress}
              label="Amount of AURA to convert"
              buttonLabel="Convert & Stake"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <WithdrawInput label="Amount of auraBAL to withdraw" buttonLabel="Unstake auraBAL" />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Info...
          </TabPanel>
        </>
      }
    />
  );
};
