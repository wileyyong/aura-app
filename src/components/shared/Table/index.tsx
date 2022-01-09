import React, { FC } from 'react';

import {
  ColumnInstance,
  TableSortByToggleProps,
  useTable,
  useSortBy,
} from 'react-table';
import { Container } from './styles';

interface Column extends ColumnInstance {
  isSorted?: boolean;
  isSortedDesc?: boolean;
  getSortByToggleProps?: (
    props?: Partial<TableSortByToggleProps>,
  ) => TableSortByToggleProps;
}

export const Table: FC<{ columns: any[]; data: any[] }> = ({
  columns,
  data,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },
      useSortBy,
    );

  return (
    <Container>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: Column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps?.())}>
                  {column.render('Header')}
                  <span>
                    {!!column.isSorted && (column.isSortedDesc ? ' 🔽' : ' 🔼')}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Container>
  );
};
