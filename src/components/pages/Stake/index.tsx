import React, { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material';
import { PoolsTable } from './PoolsTable';

import useStakedCVXAPR from '../../../hooks/useStakedCVXAPR';

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 'none',
  '&.MuiDataGrid-root .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  [`& .MuiDataGrid-cell`]: {
    borderBottom: 'none',
  },
  [`& .MuiDataGrid-row`]: {
    borderRadius: 8,
    backgroundColor: theme.palette.grey[100],
    marginBottom: theme.spacing(1),
  },
  '& .MuiDataGrid-columnSeparator': {
    visibility: 'hidden',
  },
  [`& .MuiDataGrid-columnHeaders`]: {
    borderBottom: 'none',
  },
  [`& .MuiDataGrid-columnHeader`]: {
    border: 'none',
    outline: 'none',
  },
}));

const columns: GridColDef[] = [
  { field: 'poolName', headerName: 'Pool Name', width: 300 },
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
  const { data: stakedCVXAPR } = useStakedCVXAPR();

  const handleRowClick = () => {};

  const rowsWithApr = rows.map(row => ({
    ...row,
    vApr: row.poolName === 'CVX' && stakedCVXAPR ? stakedCVXAPR : row.vApr,
  }));

  return (
    <>
      <p>Staked APR: {stakedCVXAPR}</p>
      <StyledDataGrid
        rows={rowsWithApr}
        columns={columns}
        hideFooter
        autoHeight
        onRowClick={handleRowClick}
      />
      <br />
      <PoolsTable />
    </>
  );
};
