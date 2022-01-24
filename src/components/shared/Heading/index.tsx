import { FC } from 'react';
import { styled, Typography } from '@mui/material';

const Styled = styled(Typography)`
  font-size: 1rem;
  font-weight: bold;
`;

export const Heading: FC<{ title: string }> = ({ title }) => <Styled variant="h2">{title}</Styled>;
