import { useState, FC } from 'react';
import { BigNumberish } from 'ethers';
import { Box, Tabs, Tab, AccordionDetails } from '@mui/material';

import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { useChainId, useSigner } from '../../../context/AppProvider';
import { ADDRESS } from '../../../constants';
import { CrvDepositor__factory } from '../../../typechain';
import { handleTx } from '../../../utils/handleTx';

interface Props {
  symbol: string;
  apr?: { total: number; [key: string]: number };
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = () => {
  const chainId = useChainId();
  const signer = useSigner();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const depositToken = ADDRESS[chainId].crv;
  const depositAddress = ADDRESS[chainId].crvDepositor;
  const stakeAddress = ADDRESS[chainId].cvxCRVStaking;

  const handleDeposit = (amount: BigNumberish) => {
    if (!signer) return;

    const crvDepositor = CrvDepositor__factory.connect(depositAddress, signer);

    handleTx(() => {
      return crvDepositor['deposit(uint256,bool,address)'](amount, false, stakeAddress);
    });
  };

  return (
    <AccordionDetails>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Convert" />
          <Tab label="Unstake" />
          <Tab label="Info" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <DepositInput
          onDeposit={handleDeposit}
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
    </AccordionDetails>
  );
};

export const ConvertAccordion: FC<Props> = ({ ...props }) => {
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
