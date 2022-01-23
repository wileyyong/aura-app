import { useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { ADDRESS } from '../../../constants';
import { useChainId } from '../../../context/AppProvider';

interface StakeAccordionProps extends Omit<AccordionItemProps, 'details'> {}

export const StakeAccordion = (props: StakeAccordionProps) => {
  const chainId = useChainId();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = ADDRESS[chainId].cvx;
  const depositAddress = ADDRESS[chainId].cvxRewardPool;

  return (
    <AccordionInput
      {...props}
      details={
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Stake" />
              <Tab label="Unstake" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput
              depositToken={cvxAddress}
              depositAddress={depositAddress}
              label={`Amount of ${props.symbol} to deposit`}
              buttonLabel="Stake"
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <WithdrawInput label={`Amount of ${props.symbol} to withdraw`} buttonLabel="Unstake" />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Info...
          </TabPanel>
        </>
      }
    />
  );
};
