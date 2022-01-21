import { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Collapse,
} from '@mui/material';

import { TabPanel } from '../TabPanel';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';

interface StakeBalLpAccordionProps extends Omit<AccordionItemProps, 'details'> {}

export const StakeBalLpAccordion = (props: StakeBalLpAccordionProps) => {
  const [tabValue, setTabValue] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAdvanced(event.target.checked);
  };

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  return (
    <AccordionInput
      {...props}
      details={
        <>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
              <Tab label="Deposit" />
              <Tab label="Withdraw" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <Stack spacing={3}>
              <Box ml="auto">
                <FormGroup>
                  <FormControlLabel
                    control={<Switch onChange={handleToggleChange} />}
                    label="Advanced"
                  />
                </FormGroup>
              </Box>
              <DepositInput
                label={`Amount of ${props.symbol} to deposit and stake`}
                buttonLabel="Deposit & Stake"
              />
              <Collapse in={showAdvanced}>
                <Stack spacing={3}>
                  <DepositInput
                    label={`Amount of ${props.symbol} to deposit`}
                    buttonLabel="Deposit"
                  />
                  <DepositInput label={`Amount of ${props.symbol} to stake`} buttonLabel="Stake" />
                </Stack>
              </Collapse>
            </Stack>
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
