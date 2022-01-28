import { FC, useState } from 'react';
import { BigNumber, BigNumberish } from 'ethers';
import { Box, Tabs, Tab, AccordionDetails, Alert, Stack, Collapse } from '@mui/material';

import { DepositInput } from '../DepositInput';
import { AccordionInput } from '../AccordionInput';
import { TabPanel } from '../TabPanel';
import { useAddress, useSigner } from '../../../context/AppProvider';
import { CvxLocker__factory } from '../../../typechain';
import { useAddresses } from '../../../hooks/useAddresses';
import { RewardApr } from '../../../types';
import { useModalRewardApr } from '../../../context/DataProvider';
import { useRewardWeightOf } from '../../../hooks/useRewardRateOf';
import { formatEther } from 'ethers/lib/utils';
import { format } from '../../../utils/format';

interface Props {
  symbol: string;
  apr?: RewardApr;
  tvl?: number;
  share?: number;
}

const zero = BigNumber.from('0');

const AccordionInputDetails: FC<Props> = ({ ...props }) => {
  const addresses = useAddresses();
  const signer = useSigner();
  const address = useAddress();

  const [tabValue, setTabValue] = useState(0);
  const [depositAmount, setDepositAmount] = useState('0');

  const { data: rewardWeight = zero } = useRewardWeightOf(address);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const cvxAddress = addresses.cvx;
  const cvxLocker = addresses.cvxLocker;

  const handleLock = (amount: BigNumberish) => {
    if (!signer || !address) return;
    const contract = CvxLocker__factory.connect(cvxLocker, signer);

    const spendRatio = 0;
    return contract.lock(address, amount, spendRatio);
  };

  // assuming that spend ratio is set to 0 this calculation of the new weight
  // is correct. If spend ratio (in handleLock) in not 0 this needs to change
  const newRewardWeight = Number(formatEther(rewardWeight)) + Number(depositAmount);

  return (
    <AccordionDetails>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Lock" />
          <Tab label="Info" />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <Stack spacing={2}>
          <DepositInput
            onChange={setDepositAmount}
            onDeposit={handleLock}
            depositToken={cvxAddress}
            depositAddress={cvxLocker}
            label={`Amount of ${props.symbol} to lock`}
            buttonLabel={`Lock ${props.symbol}`}
          />
          <Collapse in={Number(depositAmount) > 0}>
            <Alert severity="info">
              Your reward weight: {format(formatEther(rewardWeight.toString()), 2)} →{' '}
              {format(newRewardWeight.toString(), 2)}
              <br />
              Your lock will expire on May 26 (in 16 weeks + 7 days)
            </Alert>
          </Collapse>
        </Stack>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        Info...
      </TabPanel>
    </AccordionDetails>
  );
};

export const LockAccordion: FC<Props> = ({ ...props }) => {
  const { symbol, apr, share } = props;
  const [, setModalRewardApr] = useModalRewardApr();

  const handleInfoClick = () => {
    if (!apr) return;
    setModalRewardApr({ ...apr, symbol });
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
