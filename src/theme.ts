import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[100],
    },
  },
  transparent: {
    main: 'rgba(45, 45, 45, 0.1)',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: '4rem',
        },
        h2: {
          fontSize: '2.75rem',
        },
        h3: {
          fontSize: '2.25rem',
        },
        h4: {
          fontSize: '1.25rem',
        },
        h5: {
          fontSize: '1rem',
        },
        h6: {
          fontSize: '0.75rem',
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
    },
    MuiButton: {
      styleOverrides: {
        disableElevation: true,
        root: {
          borderRadius: '0.75rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
