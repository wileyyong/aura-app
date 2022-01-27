import { FC, MouseEvent, useState } from 'react';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import {
  AccordionSummary,
  Typography,
  Stack,
  Button,
  Accordion,
  Grid,
  styled,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { TokenIcon } from '../TokenIcon';
import { ModalReward } from '../ModalReward';

export interface AccordionItemProps {
  symbol: string;
  expanded?: boolean;
  onChange?: any;
  highlighted?: boolean;
  showArrowIcon?: boolean;
  apr?: { [key: string]: { label: string; value: number } };
  items: {
    key: string;
    title?: string;
    value?: string;
    onInfoClick?: () => void;
    button?: {
      title: string;
      onClick: () => void;
    };
  }[];
}

const Info = styled(InfoIcon)`
  margin-left: 0.5rem;
  border-radius: 1rem;
  transition: ease-out box-shadow 0.25s;

  :hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledAccordion = styled(Accordion)<{ highlighted: boolean }>`
  background: ${({ theme, highlighted }: any) =>
    highlighted ? theme.palette.grey[900] : theme.palette.grey[200]};

  & .MuiAccordionSummary-root {
    color: ${({ theme, highlighted }: any) =>
      highlighted ? theme.palette.grey[100] : theme.palette.grey[900]};
  }
  & > .MuiCollapse-root {
    background: ${({ theme }) => theme.palette.background.default};
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
  }
  & .MuiAccordionSummary-expandIconWrapper {
    transform: rotate(90deg);
    svg {
      fill: ${({ theme, highlighted }) =>
        highlighted ? theme.palette.background.default : '#000'};
    }
  }
  & .MuiAccordionSummary-expandIconWrapper.Mui-expanded {
    transform: rotate(270deg);
  }
`;

export const AccordionInput: FC<AccordionItemProps> = ({
  expanded,
  onChange,
  highlighted = false,
  children,
  symbol,
  items,
  apr,
  showArrowIcon = true,
}) => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleOpen = () => setInfoModalOpen(true);

  const handleClose = () => setInfoModalOpen(false);

  const handleInfoClick = (event?: MouseEvent<SVGSVGElement>, action?: () => void) => {
    event?.stopPropagation();
    action?.();
    handleOpen();
  };

  const handleButtonClick = (event?: MouseEvent<HTMLButtonElement>, action?: () => void) => {
    event?.stopPropagation();
    action?.();
  };

  return (
    <Grid container direction="row" key={symbol} sx={{ my: 0.5 }}>
      <StyledAccordion
        highlighted={highlighted}
        expanded={expanded}
        onChange={onChange}
        disableGutters
        elevation={0}
        sx={{ width: '100%' }}
      >
        <AccordionSummary
          expandIcon={showArrowIcon && <ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid container item xs={4} direction="row" alignItems={'center'}>
              <Grid item sx={{ mr: 1 }}>
                <TokenIcon symbol={'BAL'} />
              </Grid>
              <Grid item>
                <Typography>{symbol}</Typography>
              </Grid>
            </Grid>
            <Grid item container xs={8}>
              {items.map(item => (
                <Grid item xs={4} key={item.key}>
                  {item?.title && <Typography variant="body2">{item?.title}</Typography>}
                  <Stack direction="row">
                    <Typography>{item?.value}</Typography>
                    {!!item?.onInfoClick && (
                      <Info onClick={e => handleInfoClick(e, item.onInfoClick)} />
                    )}
                    {!!item?.button && (
                      <Button
                        variant={'contained'}
                        sx={{ width: '100%', mr: 4 }}
                        onClick={e => handleButtonClick(e, item?.button?.onClick)}
                      >
                        {item.button.title}
                      </Button>
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </AccordionSummary>
        {children}
      </StyledAccordion>
      <ModalReward open={infoModalOpen} onClose={handleClose} />
    </Grid>
  );
};
