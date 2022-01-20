import { useState } from 'react';
import {
  Typography,
  Box,
  Tabs,
  Tab,
} from '@mui/material';
import { DepositInput } from '../DepositInput';
import { WithdrawInput } from '../WithdrawInput';
import { AccordionInput, AccordionItemProps } from "../AccordionInput";

export const TabPanel = ({ children, value, index, ...other }: any) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box sx={{ pt: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);