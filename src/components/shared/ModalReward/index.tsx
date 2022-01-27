import React, { FC } from 'react';
import { Modal, styled, Typography, Grid } from '@mui/material';
import { AccordionInfo } from '../AccordionInfo';
import { Link } from 'react-router-dom';
import { ModalBox } from '../index';
import { useModalData } from '../../../context/DataProvider';

const Header = styled(Grid)`
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const CellText = styled(Typography)`
  font-size: 0.875rem;
  text-align: left;
`;

const TableRow: FC<{ title: string; value?: string }> = ({ title, value }) => {
  return (
    <Grid
      item
      container
      justifyContent="space-between"
      sx={{
        borderBottom: 1,
        borderColor: 'grey.400',
        borderBottomStyle: 'dashed',
        mb: 1,
      }}
    >
      <Grid item>
        <CellText>{title}</CellText>
      </Grid>
      {value && (
        <Grid item>
          <CellText>{value}</CellText>
        </Grid>
      )}
    </Grid>
  );
};

export const ModalReward: FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [{ rewardApr, messages }, setModalData] = useModalData();

  const handleOnClose = () => {
    setModalData({ rewardApr: undefined, messages: [] });
    onClose();
  };

  return (
    <Modal open={open} onClose={handleOnClose}>
      <ModalBox>
        <Grid container direction="column">
          <Header item sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.25rem', p: 1 }}>
              <b>Staked {rewardApr?.symbol ?? 'Dummy'}</b> rewards
            </Typography>
          </Header>
          <Grid container item direction="column" sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <Grid
              container
              direction="row"
              sx={{ bgcolor: 'grey.200', p: 1 }}
              justifyContent="space-between"
            >
              <Grid item>
                <Typography sx={{ fontSize: '1rem' }}>Current vAPR</Typography>
              </Grid>
              <Grid item>
                <Typography>{((rewardApr?.total ?? 0) * 100)?.toFixed(2)}%</Typography>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              sx={{ bgcolor: 'grey.300', p: 1 }}
              justifyContent="space-between"
            >
              <Grid item xs={4} alignItems={'flex-start'} justifyContent={'flex-start'}>
                <CellText textAlign="left">Breakdown:</CellText>
              </Grid>
              <Grid item container direction="column" xs={8}>
                {rewardApr?.crvApr && (
                  <TableRow title="CRV vAPR" value={`${(rewardApr.crvApr * 100).toFixed(2)}%`} />
                )}
                {rewardApr?.cvxApr && (
                  <TableRow title="CVX vAPR" value={`${(rewardApr.cvxApr * 100).toFixed(2)}%`} />
                )}
                {rewardApr?.threeApr && (
                  <TableRow title="3crv vAPR" value={`${(rewardApr.threeApr * 100).toFixed(2)}%`} />
                )}
                <TableRow
                  title="Plus any airdrops to Curve veCRV, not counted in the total
                      APR"
                />
              </Grid>
            </Grid>
          </Grid>
          {messages?.map(({ title, message }) => (
            <Grid item>
              <AccordionInfo title={title} content={message} />
            </Grid>
          ))}
          <Grid item>
            <AccordionInfo
              title="Where do rewards accrue?"
              content={`
                All rewards for staked cvxCRV can be claimed from the Claim page:
              `}
            />
          </Grid>
          <Grid item>
            <AccordionInfo
              highlighted={false}
              title="What does vAPR stand for?"
              content={
                <>
                  {/* // eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  All rewards for <Link to="/">staked</Link> cvxCRV can be claimed from the Claim
                  page:
                </>
              }
            />
          </Grid>
        </Grid>
      </ModalBox>
    </Modal>
  );
};
