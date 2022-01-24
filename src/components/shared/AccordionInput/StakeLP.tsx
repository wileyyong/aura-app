import {
  Box,
  Tabs,
  Tab,
  FormControlLabel,
  FormGroup,
  Stack,
  Switch,
  Collapse,
  AccordionDetails,
} from '@mui/material';
import { useState, FC } from 'react';
import { BigNumberish } from 'ethers';

import { TabPanel } from '../TabPanel';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { useChainId, useSigner } from '../../../context/AppProvider';
import { AccordionInput } from '../AccordionInput';
import { ADDRESS } from '../../../constants';
import { Pool } from '../../../hooks/usePoolInfo';
import { Booster__factory, CvxRewardPool__factory } from '../../../typechain';
import { handleTx } from '../../../utils/handleTx';

interface Props {
  symbol: string;
  pool: Pool;
  apr?: { total: number; [key: string]: number };
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ pool, ...props }) => {
  const chainId = useChainId();
  const signer = useSigner();
  const [tabValue, setTabValue] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleToggleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowAdvanced(event.target.checked);
  };

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const boosterContract = ADDRESS[chainId].booster;

  const { symbol } = props;

  const depositStake = (stake: boolean) => (amount: BigNumberish) => {
    if (!signer) return;

    const contract = Booster__factory.connect(boosterContract, signer);

    handleTx(() => {
      return contract.deposit(pool.poolId, amount, stake);
    });
  };

  // Deposit pool lp token into booster contract
  // then stake pool token into rewards contract
  const handleDepositStake = depositStake(true);

  // Deposit pool lp token into booster contract
  const handleDeposit = depositStake(false);

  // Stake pool token into rewards contract
  const handleStake = (amount: BigNumberish) => {
    if (!signer) return;

    const contract = CvxRewardPool__factory.connect(pool.crvRewards, signer);

    handleTx(() => {
      return contract.stake(amount);
    });
  };

  return (
    <AccordionDetails>
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
            onDeposit={handleDepositStake}
            depositToken={pool.lptoken}
            depositAddress={boosterContract}
            buttonLabel="Deposit & Stake"
            label={`Amount of ${symbol} to deposit and stake`}
          />
          <Collapse in={showAdvanced}>
            <Stack spacing={3}>
              <DepositInput
                onDeposit={handleDeposit}
                depositToken={pool.lptoken}
                depositAddress={boosterContract}
                label={`Amount of ${symbol} to deposit`}
                buttonLabel="Deposit"
              />
              <DepositInput
                onDeposit={handleStake}
                depositToken={pool.token}
                depositAddress={pool.crvRewards}
                label={`Amount of ${symbol} to stake`}
                buttonLabel="Stake"
              />
            </Stack>
          </Collapse>
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <WithdrawInput
          label={`Amount to ${symbol} to unstake and withdraw`}
          buttonLabel="Unstake & Withdraw"
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Info...
      </TabPanel>
    </AccordionDetails>
  );
};

export const StakeLPAccordion: FC<Props> = ({ pool, ...props }) => {
  const { symbol, apr, share } = props;
  const handleInfoClick = () => {};

  return (
    <AccordionInput
      {...props}
      symbol={symbol}
      items={[
        {
          key: 'apr',
          value: `${apr && (apr.total * 100).toFixed(2)}%`,
          onInfoClick: handleInfoClick,
        },
        {
          key: 'my-stake',
          value: `${share && (share * 100).toFixed(2)}%`,
        },
        {
          key: 'tvl',
          value: `${share && (share * 100).toFixed(2)}%`,
        },
      ]}
    >
      <AccordionInputDetails {...props} pool={pool} />
    </AccordionInput>
  );
};
