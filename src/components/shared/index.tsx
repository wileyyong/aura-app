import { Box, styled } from '@mui/material';

export const ModalBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 32rem;
  width: 100%;
  background-color: ${({ theme }) => theme.palette.grey[100]};
  border-radius: 0.75rem;
  padding: 1rem;
  text-align: center;
`;
