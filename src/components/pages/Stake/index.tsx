import React, { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'poolName', headerName: 'Pool Name', width: 200 },
  {
    field: 'vApr',
    headerName: 'vAPR',
    width: 130,
    valueFormatter: (params: any) => {
      const valueFormatted = Number(params.value * 100).toLocaleString();
      return `${valueFormatted}%`;
    },
  },
  {
    field: 'tvl',
    headerName: 'TVL',
    type: 'number',
    width: 90,
  },
];

const rows = [
  { id: 1, poolName: 'CRV', vApr: '120', tvl: 35 },
  { id: 2, poolName: 'CVX', vApr: '120', tvl: 42 },
  { id: 3, poolName: 'BAL', vApr: '120', tvl: 45 },
];

export const Stake: FC = () => {
  return <DataGrid rows={rows} columns={columns} hideFooter autoHeight />;
};
