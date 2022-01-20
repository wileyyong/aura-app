import { MouseEvent, useState } from 'react';
import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  Box,
  Stack,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoIcon from '@mui/icons-material/Info';
import { ModalPool } from '../ModalPool';

export interface AccordionItemProps {
  details: any;
  poolId: number;
  symbol: string;
  expanded?: boolean;
  onChange?: any;
  apr?: number;
  tvl?: number;
  share?: number;
  highlighted?: boolean;
}

const Info = styled(InfoIcon)`
  margin-left: 0.5rem;

  :hover {
    box-shadow: 0 0 0 1px red;
    border-radius: 1rem;
  }
`;

const StyledAccordion = styled(Accordion)<{ highlighted: boolean }>`
  background: ${({ theme, highlighted }: any) =>
    highlighted ? theme.palette.grey[900] : theme.palette.grey[200]};

  & .MuiAccordionSummary-root {
    color: ${({ theme, highlighted }: any) =>
      highlighted ? theme.palette.grey[100] : theme.palette.grey[900]};
  }

  & > .MuiCollapse-root {
    background: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
  & .MuiAccordionSummary-expandIconWrapper {
    transform: rotate(90deg);
  }
  & .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(270deg);
  }
`;

export const AccordionInput = ({
  symbol,
  poolId,
  share,
  apr,
  expanded,
  onChange,
  details,
  highlighted = false,
}: AccordionItemProps) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleOpen = () => setInfoModalOpen(true);
  const handleClose = () => setInfoModalOpen(false);

  const handleInfoClick = (event?: MouseEvent<SVGSVGElement>) => {
    event?.stopPropagation();
    handleOpen();
  };

  return (
    <Grid container direction="row" key={poolId} sx={{ my: 0.5 }}>
      <StyledAccordion
        highlighted={highlighted}
        expanded={expanded}
        onChange={onChange}
        disableGutters
        elevation={0}
        sx={{ width: '100%' }}
      >
        <AccordionSummary
          expandIcon={
            onChange && <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />
          }
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4}>
              <Typography>{symbol}</Typography>
            </Grid>
            <Grid item container xs={8}>
              <Grid item xs={4}>
                {highlighted && <Typography variant="body2">vARP</Typography>}
                <Stack direction="row">
                  <Typography>{apr && (apr * 100).toFixed(2)}%</Typography>
                  <Info onClick={handleInfoClick} />
                </Stack>
              </Grid>
              <Grid item xs={4}>
                {highlighted && (
                  <Typography variant="body2">My Stake</Typography>
                )}
                <Typography>
                  Share: {share && (share * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item xs={4}>
                {highlighted && <Typography textAlign="left">TVL</Typography>}
                <Typography variant="body2">
                  Share: {share && (share * 100).toFixed(2)}%
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>{details}</AccordionDetails>
      </StyledAccordion>
      <ModalPool open={infoModalOpen} onClose={handleClose} />
    </Grid>
  );
};
