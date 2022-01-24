import { Grid } from '@mui/material';
import { useUserRewards } from '../../../hooks/useUserRewards';
import { HeaderBox } from '../../pages/Stake/HeaderBox';

export const Overview = () => {
  const userRewards = useUserRewards();
  return (
    <Grid container direction="row" justifyContent="center" spacing={2} sx={{ my: 2 }}>
      <Grid item>
        <HeaderBox title="Total Claimable" value={`$${(userRewards?.totalUSD ?? 0).toFixed(2)}`} />
      </Grid>
      <Grid item>
        <HeaderBox title="Total Deposits" value="$0" />
      </Grid>
    </Grid>
  );
};
