import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
} from '@mui/material';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

interface PoolsRowProps {
  poolId: number;
  expanded: boolean;
  onChange: any;
  symbol: string;
}

export default function PoolsRow({
  poolId,
  expanded,
  onChange,
  symbol,
}: PoolsRowProps) {
  return (
    <Grid container direction="row" key={poolId}>
      <StyledAccordion expanded={expanded} onChange={onChange} sx={{ my: 1 }}>
        <AccordionSummary>
          <Grid container justifyContent={'space-between'}>
            <Typography>{symbol}</Typography>
            <Typography>N/A%</Typography>
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
