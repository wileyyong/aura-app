import React from 'react';
import usePoolApr from '../../../hooks/usePoolApr';
import { Pool } from '../../../hooks/usePoolInfo';
import { AccordionItem } from '../../shared/AccordionItem';

interface PoolsRowProps {
  expanded: boolean;
  onChange: any;
  pool: Pool;
}

export const PoolsRow = ({ expanded, onChange, pool }: PoolsRowProps) => {
  const { symbol, poolId } = pool;

  const { data: apr } = usePoolApr(pool);

  const share =
    Number(pool.tokenTotalSupply.toString()) /
    Number(pool.lptokenTotalSupply.toString());

  return (
    <AccordionItem
      expanded={expanded}
      poolId={poolId}
      symbol={symbol}
      apr={apr}
      share={share}
      onChange={onChange}
    />
  );
};
