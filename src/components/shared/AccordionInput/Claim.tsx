import { FC } from 'react';
import { Box, AccordionDetails, Typography } from '@mui/material';
import { AccordionInput } from '../AccordionInput';
import { RewardApr } from '../../../types';

interface Props {
  symbol: string;
  apr?: RewardApr;
  tvl?: number;
  share?: number;
}

const AccordionInputDetails: FC<Props> = ({ ...props }) => {
  return (
    <AccordionDetails>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant={'h6'}>Content</Typography>
      </Box>
    </AccordionDetails>
  );
};

export const ClaimAccordion: FC<Props> = ({ ...props }) => {
  const { symbol, apr, share } = props;

  const handleButtonClick = () => {
    alert('button, claim');
  };

  return (
    <AccordionInput
      highlighted
      showArrowIcon
      symbol={symbol}
      items={[
        {
          key: 'earned',
          title: 'Earned',
          value: `${apr && (apr.total * 100).toFixed(2)}%`,
        },
        {
          key: 'apr',
          title: 'Average vAPR',
          value: `${share && (share * 100).toFixed(2)}%`,
        },
        {
          key: 'tvl',
          button: {
            title: 'Claim All',
            onClick: handleButtonClick,
          },
        },
      ]}
    >
      <AccordionInputDetails {...props} />
    </AccordionInput>
  );
};
