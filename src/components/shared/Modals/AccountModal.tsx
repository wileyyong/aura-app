import React, { FC } from 'react';
import { Modal, Box } from '@mui/material';

import {
  useAddress,
  useConnect,
  useDisconnect,
} from '../../../context/AppProvider';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AccountModal: FC<{ open: boolean; onClose: () => void }> = ({
  open,
  onClose,
}) => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        {!!address ? (
          <>
            <h3>Connected with {address}</h3>
            <br />
            <button onClick={disconnect}>Disconnect</button>
          </>
        ) : (
          <button onClick={connect}>Connect</button>
        )}
      </Box>
    </Modal>
  );
};
