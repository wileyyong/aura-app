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

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

interface PoolsRowProps {
  expanded: boolean;
  onChange: any;
  pool: Pool;
}

export default function PoolsRow({ expanded, onChange, pool }: PoolsRowProps) {
  const { symbol, poolId } = pool;

  const { data: apr } = usePoolApr(pool);

  return (
    <Grid container direction="row" key={poolId}>
      <StyledAccordion expanded={expanded} onChange={onChange} sx={{ my: 1 }}>
        <AccordionSummary>
          <Grid container justifyContent={'space-between'}>
            <Typography>{symbol}</Typography>
            <Typography>
              {apr ? `${(apr * 100).toFixed(2)}%` : 'loading...'}
            </Typography>
            <Typography>N/A</Typography>
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
