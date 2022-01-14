import { FC, useState } from 'react';
import { Grid, styled, Typography } from '@mui/material';
import usePoolInfo from '../../../hooks/usePoolInfo';
import PoolsRow from './PoolsRow';
import Skeleton from 'react-loading-skeleton';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  font-size: 0.875rem;
`;

export const PoolsTable: FC = () => {
  const { data: pools } = usePoolInfo(['14', '19', '30']);
  const [expanded, setExpanded] = useState<number>();

  const handleChange = (panel: any) => (_: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Grid container>
      <Grid container spacing={1} sx={{ px: 2, my: 1 }}>
        <Grid item xs={3}>
          <HeaderTitle>Pool Name</HeaderTitle>
        </Grid>
        <Grid item xs={3} display={'flex'} justifyContent={'flex-end'}>
          <HeaderTitle>vApr</HeaderTitle>
        </Grid>
        <Grid item xs={3} display={'flex'} justifyContent={'flex-end'}>
          <HeaderTitle>TVL</HeaderTitle>
        </Grid>
      </Grid>
      {pools ? (
        pools.map(row => (
          <PoolsRow
            pool={row}
            key={row.poolId}
            expanded={expanded === row.poolId}
            onChange={handleChange(row.poolId)}
          />
        ))
      ) : (
        <Skeleton width={300} height={50} />
      )}
    </Grid>
  );
};
