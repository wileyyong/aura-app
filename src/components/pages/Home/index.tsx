import React, { FC } from 'react';
import { useDataProvider } from '../../../context/DataProvider';
import { Container } from './styles';

export const Home: FC = () => {
  const [{ crv }] = useDataProvider();

  return (
    <Container>
      <p>{!crv ? 'Loading...' : `CRV address: ${crv}`}</p>
    </Container>
  );
};
