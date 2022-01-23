import React from 'react';
import { useAddress } from '../../../context/AppProvider';
import { useBalanceOf } from '../../../hooks/useBalanceOf';
import usePoolApr from '../../../hooks/usePoolApr';
import { Pool } from '../../../hooks/usePoolInfo';
import { StakeBalLpAccordion } from '../../shared/AccordionInput/StakeBalLp';

interface PoolsRowProps {
  expanded: boolean;
  onChange: any;
  pool: Pool;
}

export const PoolsRow = ({ expanded, onChange, pool }: PoolsRowProps) => {
  const { symbol, poolId } = pool;

  const account = useAddress();
  const { data: lpBalance } = useBalanceOf(pool.lptoken, account);

  const { data: apr } = usePoolApr(pool);

  const share =
    Number(pool.tokenTotalSupply.toString()) / Number(pool.lptokenTotalSupply.toString());

  return (
    <StakeBalLpAccordion
      lpTokenBalance={lpBalance}
      expanded={expanded}
      poolId={poolId}
      symbol={symbol}
      apr={apr}
      share={share}
      onChange={onChange}
    />
  );
};
