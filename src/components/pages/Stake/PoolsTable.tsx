import React, { FC, useRef, useState } from 'react';
import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  Button,
} from '@mui/material';

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
}));

enum Header {
  poolName = 'poolName',
  vApr = 'vApr',
  tvl = 'tvl',
}

const headers = [
  { id: Header.poolName, title: 'Pool Name' },
  { id: Header.vApr, title: 'vAPR' },
  { id: Header.tvl, title: 'TVL' },
];

const data = [
  { id: 1, [Header.poolName]: 'CRV', [Header.vApr]: 120, [Header.tvl]: 35 },
  { id: 2, [Header.poolName]: 'CVX', [Header.vApr]: 700, [Header.tvl]: 42 },
  { id: 3, [Header.poolName]: 'BAL', [Header.vApr]: 130, [Header.tvl]: 45 },
];

// Might be overcooked but probably gives us more flexibility in style

export const PoolsTable: FC = () => {
  const [sorted, setSorted] = useState(data);
  const [expanded, setExpanded] = useState<number>();
  const isAsc = useRef(false);

  const handleChange = (panel: any) => (_: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleHeaderClick = (key: Header) => {
    const newSorted = new Array(data.length)
      .concat(data)
      .sort((a, b) => (a[key] < b[key] ? -1 : 1));
    isAsc.current = !isAsc.current;
    setSorted(isAsc.current ? newSorted : newSorted.reverse());
  };

  return (
    <Grid container>
      <Grid container justifyContent={'space-between'}>
        {headers.map(header => (
          <Button key={header.id} onClick={() => handleHeaderClick(header.id)}>
            {header.title}
          </Button>
        ))}
      </Grid>
      {sorted.map(row => (
        <Grid container direction="row" key={`${row.poolName}-${row.id}`}>
          <StyledAccordion
            expanded={expanded === row.id}
            onChange={handleChange(row.id)}
            sx={{ my: 1 }}
          >
            <AccordionSummary>
              <Grid container justifyContent={'space-between'}>
                <Typography>{row.poolName}</Typography>
                <Typography>{row.vApr}%</Typography>
                <Typography>{row.tvl}</Typography>
              </Grid>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {row.poolName === 'CRV' && <span>hello</span>}
                {row.poolName === 'CVX' && <span>test</span>}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </AccordionDetails>
          </StyledAccordion>
        </Grid>
      ))}
    </Grid>
  );
};
