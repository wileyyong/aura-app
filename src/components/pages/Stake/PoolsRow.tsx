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

  const { data: aprData } = usePoolApr(pool);

  const apr = aprData && {
    crvApr: { label: 'CRV vAPR', value: aprData.crvApr },
    cvxApr: { label: 'CVX vAPR', value: aprData.cvxApr },
    total: { label: 'Total vAPR', value: aprData.total },
  };

  const share =
    Number(pool.tokenTotalSupply.toString()) / Number(pool.lptokenTotalSupply.toString());

  return <StakeLPAccordion pool={pool} symbol={symbol} apr={apr} share={share} />;
};
