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
import { useState } from 'react';

import { TabPanel } from '../TabPanel';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { useChainId } from '../../../context/AppProvider';
import { AccordionInput, AccordionItemProps } from '../AccordionInput';
import { ADDRESS } from '../../../constants';
import { Pool } from '../../../hooks/usePoolInfo';

interface StakeBalLpAccordionProps extends Omit<AccordionItemProps, 'details'> {
  pool: Pool;
}

export const StakeBalLpAccordion = ({ pool, ...props }: StakeBalLpAccordionProps) => {
  const chainId = useChainId();

  const [tabValue, setTabValue] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAdvanced(event.target.checked);
  };

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const boosterContract = ADDRESS[chainId].booster;

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
                depositToken={pool.lptoken}
                depositAddress={boosterContract}
                buttonLabel="Deposit & Stake"
                label={`Amount of ${props.symbol} to deposit and stake`}
              />
              <Collapse in={showAdvanced}>
                <Stack spacing={3}>
                  <DepositInput
                    depositToken={pool.lptoken}
                    depositAddress={boosterContract}
                    label={`Amount of ${props.symbol} to deposit`}
                    buttonLabel="Deposit"
                  />
                  <DepositInput
                    depositToken={pool.token}
                    depositAddress={pool.crvRewards}
                    label={`Amount of ${props.symbol} to stake`}
                    buttonLabel="Stake"
                  />
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
