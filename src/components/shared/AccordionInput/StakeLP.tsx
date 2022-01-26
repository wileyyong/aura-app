import { Box, Tabs, Tab, AccordionDetails, Stack } from '@mui/material';
import { useState, useMemo, FC } from 'react';
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

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const boosterAddress = ADDRESS[chainId].booster;

  const booster = useMemo(
    () => signer && Booster__factory.connect(boosterAddress, signer),
    [boosterAddress, signer],
  );

  const { symbol } = props;

  // Deposit pool lp token into booster contract
  // then stake pool token into rewards contract
  const handleDepositStake = (amount: BigNumberish) => {
    if (!booster) return;
    handleTx(() => {
      const stake = true;
      return booster.deposit(pool.poolId, amount, stake);
    });
  };

  // Unstake from the rewards pool
  const handleUnstake = (amount: BigNumberish) => {
    if (!signer) return;
    const rewards = CvxRewardPool__factory.connect(pool.crvRewards, signer);
    handleTx(async () => {
      const claim = true;
      return rewards.withdraw(amount, claim);
    });
  };
  
  // Withdraw LP tokens
  const handleWithdraw = (amount: BigNumberish) => {
    if (!booster) return;
    handleTx(async () => {
      return booster.withdraw(pool.poolId, amount);
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
