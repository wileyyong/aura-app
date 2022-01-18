import React, { FC, ReactElement } from 'react';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  styled,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface Props {
  title: string;
  content: string | ReactElement;
  highlighted?: boolean;
  expanded?: boolean;
  onChange?: any;
}

const StyledAccordion = styled(Accordion)<{ highlighted: boolean }>`
  border: 1px solid
    ${({ theme, highlighted }) =>
      highlighted ? theme.palette.primary.main : theme.palette.grey[400]};
  border-radius: 0.75rem !important;
  background: ${({ theme, highlighted }) =>
    highlighted ? theme.palette.secondary.main : theme.palette.grey[300]};

  & .MuiAccordionSummary-expandIconWrapper {
    transform: rotate(90deg);
    color: ${({ theme, highlighted }) =>
      highlighted ? theme.palette.primary.main : theme.palette.grey[500]};
  }
  & .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(270deg);
  }
`;

export const AccordionInfo: FC<Props> = ({
  expanded,
  onChange,
  title,
  content,
  highlighted = true,
}) => {
  return (
    <Box sx={{ my: 1 }}>
      <StyledAccordion
        expanded={expanded}
        onChange={onChange}
        disableGutters
        elevation={0}
        highlighted={highlighted}
      >
        <AccordionSummary
          expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        >
          <InfoOutlinedIcon sx={{ mr: 1.5 }} />
          <Typography>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ ml: 4.5 }}>
          <Typography textAlign="left" sx={{ fontSize: '0.875rem' }}>
            {content}
          </Typography>
        </AccordionDetails>
      </StyledAccordion>
    </Box>
  );
};
