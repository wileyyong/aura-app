import React, { FC } from 'react';
import { Box, styled } from '@mui/material';
import BAL from '../../../assets/tokens/balancer.svg';

interface Props {
  symbol?: string;
}

const ICONS: Record<string, string> = {
  BAL,
};

const StyledBox = styled(Box)`
  background: ${({ theme }) => theme.palette.background.default};
  border-radius: 1rem;
  height: 1.5rem;
  width: 1.5rem;
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

export const TokenIcon: FC<Props> = ({ symbol }) => {
  const icon = ICONS[symbol?.toUpperCase() ?? ''];
  return (
    <StyledBox>
      <img src={icon} alt={symbol} />
    </StyledBox>
  );
};
