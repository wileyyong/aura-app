import React, { FC } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { styled } from '@mui/material';
import { PoolsTable } from './PoolsTable';

import useStakedCVXAPR from '../../../hooks/useStakedCVXAPR';
import useLockedCVXAPR from '../../../hooks/useLockedCVXAPR';
import useStakedCVXCRVAPR from '../../../hooks/useStakedCVXCRVAPR';
import usePoolInfo from '../../../hooks/usePoolInfo';

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

export const Stake: FC = () => {
  const { data: stakedCVXAPR } = useStakedCVXAPR();
  const { data: lockedCVXAPR } = useLockedCVXAPR();
  const { data: stakedCVXCRVAPR } = useStakedCVXCRVAPR();

  const handleRowClick = () => {};

  const rows = [
    { id: 1, poolName: 'CVX', vApr: stakedCVXAPR, tvl: 35 },
    { id: 2, poolName: 'Locked CVX', vApr: lockedCVXAPR, tvl: 42 },
    { id: 3, poolName: 'cvxCRV', vApr: stakedCVXCRVAPR, tvl: 45 },
  ];

  return (
    <>
      <StyledDataGrid
        rows={rows}
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
