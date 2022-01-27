import { BigNumberish } from 'ethers';
import { FC, useMemo, useState } from 'react';
import { Box, Tabs, Tab, AccordionDetails } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { useSigner } from '../../../context/AppProvider';
import { CvxRewardPool__factory } from '../../../typechain';
import { useAddresses } from '../../../hooks/useAddresses';
import { PoolApr } from '../../../types';
import { useModalData } from '../../../context/DataProvider';

interface Props {
  symbol: string;
  apr?: PoolApr;
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ ...props }) => {
  const addresses = useAddresses();
  const signer = useSigner();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = addresses.cvx;
  const depositAddress = addresses.cvxRewardPool;

  const cvxRewardPool = useMemo(
    () => signer && CvxRewardPool__factory.connect(depositAddress, signer),
    [depositAddress, signer],
  );

  // Stake CVX into cvx reward contract
  const handleDeposit = (amount: BigNumberish) => {
    if (!cvxRewardPool) return;
    return cvxRewardPool.stake(amount);
  };

  // Withdraw staked CVX from reward contract
  const handleWithdraw = (amount: BigNumberish) => {
    if (!cvxRewardPool) return;
    return cvxRewardPool.withdraw(amount, true);
  };

  return (
    <AccordionDetails>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Stake" />
          <Tab label="Unstake" />
          <Tab label="Info" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <DepositInput
          onDeposit={handleDeposit}
          depositToken={cvxAddress}
          depositAddress={depositAddress}
          label={`Amount of ${props.symbol} to deposit`}
          buttonLabel="Stake"
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <WithdrawInput
          onWithdraw={handleWithdraw}
          stakeAddress={depositAddress}
          label={`Amount of ${props.symbol} to withdraw`}
          buttonLabel="Unstake"
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Info...
      </TabPanel>
    </AccordionDetails>
  );
};

export const StakeAccordion: FC<Props> = ({ ...props }) => {
  const { symbol, apr, share } = props;
  const [, setModalData] = useModalData();

  const handleInfoClick = () => {
    if (!apr) return;
    setModalData({ ...apr, symbol });
  };

  return (
    <AccordionInput
      showArrowIcon={false}
      symbol={symbol}
      highlighted
      expanded
      items={[
        {
          key: 'apr',
          title: 'vAPR',
          value: `${apr && (apr.total * 100).toFixed(2)}%`,
          onInfoClick: apr ? handleInfoClick : undefined,
        },
        {
          key: 'my-stake',
          title: 'My Stake',
          value: `Share: ${share && (share * 100).toFixed(2)}%`,
        },
        {
          key: 'tvl',
          title: 'TVL',
          value: `Share: ${share && (share * 100).toFixed(2)}%`,
        },
      ]}
    >
      <AccordionInputDetails {...props} />
    </AccordionInput>
  );
};
