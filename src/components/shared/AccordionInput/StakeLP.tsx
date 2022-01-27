import { Box, Tabs, Tab, AccordionDetails, Stack } from '@mui/material';
import { useState, useMemo, FC } from 'react';
import { BigNumberish } from 'ethers';

import { TabPanel } from '../TabPanel';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { useSigner } from '../../../context/AppProvider';
import { AccordionInput } from '../AccordionInput';
import { Pool } from '../../../hooks/usePoolInfo';
import { Booster__factory } from '../../../typechain';
import { useAddresses } from '../../../hooks/useAddresses';
import { RewardApr } from '../../../types';
import { useModalRewardApr } from '../../../context/DataProvider';
import { CvxRewardPool__factory } from '../../../typechain/factories/CvxRewardPool__factory';

interface Props {
  symbol: string;
  pool: Pool;
  apr?: RewardApr;
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ pool, ...props }) => {
  const addresses = useAddresses();
  const signer = useSigner();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const boosterAddress = addresses.booster;

  const booster = useMemo(
    () => signer && Booster__factory.connect(boosterAddress, signer),
    [boosterAddress, signer],
  );

  const { symbol } = props;

  // Deposit pool lp token into booster contract
  // then stake pool token into rewards contract
  const handleDepositStake = (amount: BigNumberish) => {
    if (!booster) return;
    const stake = true;
    return booster.deposit(pool.poolId, amount, stake);
  };

  // Unstake from the rewards pool
  const handleUnstake = (amount: BigNumberish) => {
    if (!signer) return;
    const rewards = CvxRewardPool__factory.connect(pool.crvRewards, signer);
    const claim = true;
    return rewards.withdraw(amount, claim);
  };

  // Withdraw LP tokens
  const handleWithdraw = (amount: BigNumberish) => {
    if (!booster) return;
    return booster.withdraw(pool.poolId, amount);
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
        <DepositInput
          onDeposit={handleDepositStake}
          depositToken={pool.lptoken}
          depositAddress={boosterAddress}
          buttonLabel="Deposit & Stake"
          label={`Amount of ${symbol} to deposit and stake`}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Stack spacing={2}>
          <WithdrawInput
            onWithdraw={handleUnstake}
            stakeAddress={pool.crvRewards}
            label={`Amount to ${symbol} to unstake`}
            buttonLabel="Unstake"
          />
          <WithdrawInput
            onWithdraw={handleWithdraw}
            stakeAddress={pool.token}
            label={`Amount to ${symbol} to withdraw`}
            buttonLabel="Withdraw"
          />
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Info...
      </TabPanel>
    </AccordionDetails>
  );
};

export const StakeLPAccordion: FC<Props> = ({ pool, ...props }) => {
  const { symbol, apr, share } = props;
  const [, setModalRewardApr] = useModalRewardApr();

  const handleInfoClick = () => {
    if (!apr) return;
    setModalRewardApr({ ...apr, symbol });
  };

  return (
    <AccordionInput
      symbol={symbol}
      items={[
        {
          key: 'apr',
          value: `${apr && (apr.total * 100).toFixed(2)}%`,
          onInfoClick: apr ? handleInfoClick : undefined,
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
