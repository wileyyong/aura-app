import React from 'react';

import { useModal } from 'react-modal-hook';
import { Modal } from '../components/shared/Modal';
import { useAddress, useConnect, useDisconnect } from '../context/AppProvider';

export const useAccountModal = (): [() => void, () => void] => {
  const address = useAddress();
  const disconnect = useDisconnect();
  const connect = useConnect();

  const [showModal, hideModal] = useModal(
    ({ onExited }) => {
      return (
        <Modal title="Account" onExited={onExited} hideModal={hideModal}>
          {!!address ? (
            <>
              <h3>Connected with {address}</h3>
              <br />
              <button onClick={disconnect}>Disconnect</button>
            </>
          ) : (
            <button onClick={connect}>Connect</button>
          )}
        </Modal>
      );
    },
    [address],
  );
  return [showModal, hideModal];
};
