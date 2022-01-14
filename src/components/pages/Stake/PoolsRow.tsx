import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
} from '@mui/material';
import usePoolApr from '../../../hooks/usePoolApr';
import { Pool } from '../../../hooks/usePoolInfo';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

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

interface PoolsRowProps {
  expanded: boolean;
  onChange: any;
  pool: Pool;
}

export default function PoolsRow({ expanded, onChange, pool }: PoolsRowProps) {
  const { symbol, poolId } = pool;

  const { data: apr } = usePoolApr(pool);

  return (
    <Grid container direction="row" key={poolId} sx={{ my: 0.5 }}>
      <StyledAccordion
        expanded={expanded}
        onChange={onChange}
        disableGutters
        elevation={0}
      >
        <AccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        >
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Typography>{symbol}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign="right">
                {apr ? `${(apr * 100).toFixed(2)}%` : 'loading...'}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography textAlign="right">N/A</Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
            lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </Grid>
  );
}
