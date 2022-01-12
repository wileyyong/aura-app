import React, { FC } from 'react';
import { useDataProvider } from '../../../context/DataProvider';

export const Home: FC = () => {
  const [{ crv }] = useDataProvider();

  return (
    <div>
      <p>{!crv ? 'Loading...' : `CRV address: ${crv}`}</p>
    </div>
  );
};
