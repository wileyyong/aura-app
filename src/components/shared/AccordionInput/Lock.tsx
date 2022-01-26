import { FC, useState } from 'react';
import { BigNumberish } from 'ethers';
import { Box, Tabs, Tab, AccordionDetails } from '@mui/material';

import { DepositInput } from '../DepositInput';
import { AccordionInput } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { useAddress, useSigner } from '../../../context/AppProvider';
import { CvxLocker__factory } from '../../../typechain';
import { useAddresses } from '../../../hooks/useAddresses';

interface Props {
  symbol: string;
  apr?: { total: number; [key: string]: number };
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ ...props }) => {
  const addresses = useAddresses();
  const signer = useSigner();
  const address = useAddress();

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = addresses.cvx;
  const cvxLocker = addresses.cvxLocker;

  const handleLock = (amount: BigNumberish) => {
    if (!signer || !address) return;
    const contract = CvxLocker__factory.connect(cvxLocker, signer);

    const spendRatio = 0;
    return contract.lock(address, amount, spendRatio);
  };

  return (
    <AccordionDetails>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Lock" />
          <Tab label="Info" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <DepositInput
          onDeposit={handleLock}
          depositToken={cvxAddress}
          depositAddress={cvxLocker}
          label={`Amount of ${props.symbol} to lock`}
          buttonLabel={`Lock ${props.symbol}`}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Info...
      </TabPanel>
    </AccordionDetails>
  );
};

export const LockAccordion: FC<Props> = ({ ...props }) => {
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
