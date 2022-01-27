import React, { FC } from 'react';
import { Modal, styled, Typography, Grid } from '@mui/material';
import { AccordionInfo } from '../AccordionInfo';
import { Link } from 'react-router-dom';
import { ModalBox } from '../index';

const Header = styled(Grid)`
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

const CellText = styled(Typography)`
  font-size: 0.75rem;
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

interface ModalPoolProps {
  apr?: { [key: string]: { label: string; value: number } };
  open: boolean;
  onClose: () => void;
}

export const ModalPool: FC<ModalPoolProps> = ({ apr, open, onClose }) => {
  const { total: totalApr, ...aprData } = apr || {};

  return (
    <Modal open={open} onClose={onClose}>
      <ModalBox>
        <Grid container direction="column">
          <Header item sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: '1.25rem', p: 1 }}>
              <b>Staked auraBAL</b> rewards
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
                <Typography variant="h5">{(totalApr?.value * 100).toFixed(2)}%</Typography>
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
                {aprData &&
                  Object.values(aprData).map(
                    ({ value, label }: { value: number; label: string }) => (
                      <TableRow title={label} value={`${(value * 100).toFixed(2)}%`} />
                    ),
                  )}
                <TableRow
                  title="Plus any airdrops to Curve veCRV, not counted in the total
                      APR"
                />
              </Grid>
            </Grid>
          </Grid>
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
