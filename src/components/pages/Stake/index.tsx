import React, { FC } from 'react';
import { Container } from './styles';

import { makeDummyData } from './makeDummyData';
import { Table } from '../../shared/Table';

const columns = [
  {
    Header: 'Pools',
    columns: [
      {
        Header: 'Pool Name',
        accessor: 'poolName',
      },
      {
        Header: 'vAPR',
        accessor: 'vApr',
      },
      {
        Header: 'TVL',
        accessor: 'tvl',
      },
    ],
  },
];

export const Stake: FC = () => {
  const data = React.useMemo(() => makeDummyData(10), []);
  return (
    <Container>
      <Table columns={columns} data={data} />
    </Container>
  );
};
