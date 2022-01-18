import { FC, useState } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import usePoolInfo from '../../../hooks/usePoolInfo';
import { PoolsRow } from './PoolsRow';
import Skeleton from 'react-loading-skeleton';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  font-size: 0.875rem;
`;

// Might be overcooked but probably gives us more flexibility in style

export const PoolsTable: FC = () => {
  const { data: pools } = usePoolInfo(['14', '19', '30']);
  const [expanded, setExpanded] = useState<number>();

  const handleChange = (panel: any) => (_: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Grid container>
        <Grid
          container
          spacing={1}
          sx={{ px: 2, my: 1, width: 'calc(100% - 10px)' }}
        >
          <Grid item xs={4}>
            <HeaderTitle>Pool Name</HeaderTitle>
          </Grid>
          <Grid item container xs={8}>
            <Grid item xs={4}>
              <HeaderTitle>vApr</HeaderTitle>
            </Grid>
            <Grid item xs={4}>
              <HeaderTitle>My Deposits</HeaderTitle>
            </Grid>
            <Grid item xs={4}>
              <HeaderTitle>TVL</HeaderTitle>
            </Grid>
          </Grid>
        </Grid>
        {pools &&
          pools.map(row => (
            <PoolsRow
              pool={row}
              key={row.poolId}
              expanded={expanded === row.poolId}
              onChange={handleChange(row.poolId)}
            />
          ))}
      </Grid>
      {!pools && <Skeleton height={50} count={3} />}
    </>
  );
};
