import React, { FC } from 'react';

import { useAddress, useConnect } from '../../../context/AppProvider';
import { mediumAddress } from '../../../utils';
import { Link } from 'react-router-dom';
import { Container, Left, Right, Address, Connect } from './styles';

export const Header: FC = () => {
  const connect = useConnect();
  const address = useAddress();

  return (
    <Container>
      <Left>
        <Link to="/">
          <h1>Aura</h1>
        </Link>
      </Left>
      <Right>
        <Link to="/stake">Stake</Link>
        {address ? (
          <Address>{mediumAddress(address)}</Address>
        ) : (
          <Connect onClick={connect}>Connect Wallet</Connect>
        )}
      </Right>
    </Container>
  );
};
