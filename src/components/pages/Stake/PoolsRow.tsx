import React from 'react';
import usePoolApr from '../../../hooks/usePoolApr';
import { Pool } from '../../../hooks/usePoolInfo';
import { StakeLPAccordion } from '../../shared/AccordionInput/StakeLP';

interface PoolsRowProps {
  expanded: boolean;
  onChange: any;
  pool: Pool;
}

export const PoolsRow = ({ expanded, onChange, pool }: PoolsRowProps) => {
  const { symbol } = pool;
  const { data: apr } = usePoolApr(pool);

  const share =
    Number(pool.tokenTotalSupply.toString()) / Number(pool.lptokenTotalSupply.toString());

  return <StakeLPAccordion pool={pool} symbol={symbol} apr={apr} share={share} />;
};
