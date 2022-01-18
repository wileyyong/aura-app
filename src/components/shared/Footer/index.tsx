import React from 'react';
import { Grid, Typography, Box, Container, styled } from '@mui/material';

const Wrapper = styled('div')`
  background: ${({ theme }) => theme.palette.grey[200]};
  padding: 40px 10px;
  box-sizing: border-box;
`;

export const Footer = () => {
  return (
    <Wrapper>
      <Container maxWidth="md">
        <footer>
          <Grid container>
            <Grid item xs={3}>
              <Box mb={2}>
                <Typography variant="h4">
                  <b>
                    <u>AURA</u>
                  </b>
                </Typography>
              </Box>
              <Typography variant="h5">Supported by</Typography>
              <Typography variant="h5">Balancer</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box mb={2}>
                <Typography>
                  <b>Community</b>
                </Typography>
              </Box>
              <Typography>Twitter</Typography>
              <Typography>Discord</Typography>
              <Typography>Telegram Chat</Typography>
              <Typography>Telegram Announcements</Typography>
            </Grid>
            <Grid item xs={4}>
              <Box mb={2}>
                <Typography>
                  <b>Resources</b>
                </Typography>
              </Box>
              <Typography>Documentation</Typography>
              <Typography>Blog</Typography>
              <Typography>Email</Typography>
            </Grid>
          </Grid>
        </footer>
      </Container>
    </Wrapper>
  );
};
