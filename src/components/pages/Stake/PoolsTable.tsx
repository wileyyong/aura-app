import { FC, useMemo, useState } from 'react';
import { Button, Grid, styled, Typography } from '@mui/material';
import usePoolInfo from '../../../hooks/usePoolInfo';
import { PoolsRow } from './PoolsRow';
import Skeleton from 'react-loading-skeleton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SkeletonWrapper = styled('div')`
  margin-bottom: 0.25rem;
`;

const HeaderTitle = styled(Typography)`
  font-weight: 500;
  font-size: 0.875rem;
`;

export const PoolsTable: FC = () => {
  const { data } = usePoolInfo(['14', '19', '30']);
  const [expanded, setExpanded] = useState<number>();
  const [showAll, setShowAll] = useState<boolean>(false);

  const pools = useMemo(
    () => (showAll ? data?.slice(0, 1000) : data?.slice(0, 1)),
    [data, showAll],
  );

  const handleChange = (panel: any) => (_: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleShowAll = () => setShowAll(true);

  return (
    <Grid container>
      <Grid container spacing={1} sx={{ px: 2, my: 1, width: 'calc(100% - 10px)' }}>
        <Grid item xs={4}>
          <HeaderTitle>Pool Name</HeaderTitle>
        </Grid>
        <Grid item container xs={8}>
          <Grid item xs={4}>
            <HeaderTitle>vAPR</HeaderTitle>
          </Grid>
          <Grid item xs={4}>
            <HeaderTitle>My Deposits</HeaderTitle>
          </Grid>
          <Grid item xs={4}>
            <HeaderTitle>TVL</HeaderTitle>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sx={{ width: '100%' }}>
        {!!pools?.length ? (
          pools.map(row => (
            <PoolsRow
              pool={row}
              key={row.poolId}
              expanded={expanded === row.poolId}
              onChange={handleChange(row.poolId)}
            />
          ))
        ) : (
          <Skeleton height={50} count={3} wrapper={SkeletonWrapper} />
        )}
      </Grid>
      {!showAll && (
        <Grid item sx={{ width: '100%' }}>
          <Button
            onClick={handleShowAll}
            variant="outlined"
            sx={{ width: '100%', fontSize: '1rem', py: 1.25, my: 1 }}
          >
            Show All Balancer Pools
            <ArrowDropDownIcon />
          </Button>
        </Grid>
      )}
    </Grid>
  );
};
