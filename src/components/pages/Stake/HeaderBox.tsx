import React, { FC } from 'react';
import { Box, Grid, styled, Typography } from '@mui/material';

const Heading = styled(Typography)`
  font-size: 1rem;
  font-weight: 700;
  opacity: 0.75;
`;

const Subtitle = styled(Typography)`
  font-size: 1.5rem;
  font-weight: 700;
`;

const StyledBox = styled(Box)`
  background: red;
  text-align: center;
  background: ${({ theme }) => theme.transparent.main};
  border-radius: 0.625rem;
  padding: 1.25rem 6rem;
`;

export const HeaderBox: FC<{ title: string; value: string }> = ({ title, value }) => (
  <StyledBox>
    <Grid item>
      <Heading>{title}</Heading>
    </Grid>
    <Grid item>
      <Subtitle>{value}</Subtitle>
    </Grid>
  </StyledBox>
);
