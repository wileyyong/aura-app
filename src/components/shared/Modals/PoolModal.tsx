import React, { useState, FC } from 'react';
import {
  Modal,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  Box,
  Paper,
  Stack,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const HeaderTitle = styled(Typography)`
  font-weight: 600;
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[400]};
`;

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 1rem;
  padding: 1rem;
`;

export const PoolModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const [expanded, setExpanded] = useState<null | string>(null);

  const rows = [
    {
      id: 'rewards',
      title: 'Where do rewards accrue?',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
    },
    {
      id: 'vapr',
      title: 'What does vAPR stand for?',
      content:
        'vAPR stands for “Variable Annual Percentage Rate”: it is the interest you’d earn on your deposits for a whole year, and it’s variable because it depends on today’s trading activity in all pools, the price of the assets you deposit, the price of the assets you’re rewarded with, and the current rewards rates.',
    },
  ];

  const handleExpand = (id: string) => () => {
    setExpanded(currentId => (id === currentId ? null : id));
  };

  return (
    <Modal open={open} onClose={onClose}>
      <StyledBox>
        <HeaderTitle sx={{ mb: 1, pb: 1 }}>Pool rewards</HeaderTitle>
        <Box mb={2}>
          <Paper>
            <Box p={2}>
              <Stack
                mb={2}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1">
                  <b>Current Total APR</b>
                </Typography>
                <Typography>
                  <b>69.0%</b>
                </Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption">BAL APR</Typography>
                <Typography variant="caption">12.3%</Typography>
              </Stack>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="caption">AURA APR</Typography>
                <Typography variant="caption">56.7%</Typography>
              </Stack>
            </Box>
          </Paper>
        </Box>

        {rows.map(row => (
          <Accordion
            id={row.id}
            key={row.id}
            onChange={handleExpand(row.id)}
            expanded={expanded === row.id}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{row.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{row.content}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </StyledBox>
    </Modal>
  );
};
