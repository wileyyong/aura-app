import { MouseEvent, useState } from 'react';
import {
  Accordion,
  Grid,
  AccordionSummary,
  Typography,
  AccordionDetails,
  styled,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import usePoolApr from '../../../hooks/usePoolApr';
import { Pool } from '../../../hooks/usePoolInfo';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import InfoIcon from '@mui/icons-material/Info';
import { PoolModal } from '../../shared/Modals/PoolModal';
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
