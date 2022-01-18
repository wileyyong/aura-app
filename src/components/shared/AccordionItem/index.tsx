import { MouseEvent, useState } from 'react';
import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoIcon from '@mui/icons-material/Info';
import { PoolModal } from '../../shared/Modals/PoolModal';
import { DepositInput } from '../../shared/DepositInput';
import { WithdrawInput } from '../../shared/WithdrawInput';

interface AccordionItemProps {
  poolId: number;
  symbol: string;
  expanded?: boolean;
  onChange?: any;
  apr?: number;
  tvl?: number;
  share?: number;
}

const Info = styled(InfoIcon)`
  margin-left: 0.5rem;

  :hover {
    box-shadow: 0 0 0 1px red;
    border-radius: 1rem;
  }
`;

const StyledAccordion = styled(Accordion)`
  background: ${({ theme }) => theme.palette.grey[200]};

  & .MuiCollapse-root {
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

const TabPanel = ({ children, value, index, ...other }: any) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ pt: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export const AccordionItem = ({
  symbol,
  poolId,
  share,
  apr,
  expanded,
  onChange,
}: AccordionItemProps) => {
  const [tabValue, setTabValue] = useState(0);

  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleOpen = () => setInfoModalOpen(true);
  const handleClose = () => setInfoModalOpen(false);

  const handleTabChange = (_: any, newValue: number) => setTabValue(newValue);

  const handleInfoClick = (event?: MouseEvent<SVGSVGElement>) => {
    event?.stopPropagation();
    handleOpen();
  };

  return (
    <Grid container direction="row" key={poolId} sx={{ my: 0.5 }}>
      <StyledAccordion
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
            <Grid item xs={3}>
              <Typography>{symbol}</Typography>
            </Grid>
            <Grid container item xs={3} justifyContent={'flex-end'}>
              <Grid item>
                <Typography textAlign="right">
                  {apr && (apr * 100).toFixed(2)}%
                </Typography>
              </Grid>
              <Grid item>
                <Info onClick={handleInfoClick} />
              </Grid>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign="right">
                Share: {share && (share * 100).toFixed(2)}%
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="basic tabs example"
            >
              <Tab label="Deposit" />
              <Tab label="Unstake" />
              <Tab label="Info" />
            </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            <DepositInput label="Amount to deposit" buttonLabel="Stake" />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <WithdrawInput label="Amount to withdraw" buttonLabel="Unstake" />
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            Info...
          </TabPanel>
        </AccordionDetails>
      </StyledAccordion>
      <PoolModal open={infoModalOpen} onClose={handleClose} />
    </Grid>
  );
};
