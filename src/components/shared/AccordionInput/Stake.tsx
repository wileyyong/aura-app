import { FC, useMemo, useState } from 'react';
import { Box, Tabs, Tab, AccordionDetails } from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { ADDRESS } from '../../../constants';
import { useChainId, useSigner } from '../../../context/AppProvider';
import { CvxRewardPool__factory } from '../../../typechain';
import { BigNumberish } from 'ethers';

interface Props {
  symbol: string;
  apr?: { total: number; [key: string]: number };
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ ...props }) => {
  const chainId = useChainId();
  const signer = useSigner();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = ADDRESS[chainId].cvx;
  const depositAddress = ADDRESS[chainId].cvxRewardPool;

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
  const handleInfoClick = () => {};

  return (
    <AccordionInput
      {...props}
      showArrowIcon={false}
      symbol={symbol}
      highlighted
      expanded
      items={[
        {
          key: 'apr',
          title: 'vAPR',
          value: `${apr && (apr.total * 100).toFixed(2)}%`,
          onInfoClick: handleInfoClick,
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
