import { createTheme } from '@mui/material';
import { blue } from '@mui/material/colors';

const defaults = createTheme({
  transparent: {
    main: 'rgba(45, 45, 45, 0.1)',
  },
  borderRadius: {
    main: '0.75rem',
  },
});

export const theme = createTheme(defaults, {
  palette: {
    primary: {
      main: blue[500],
    },
    secondary: {
      main: blue[100],
    },
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
    MuiCollapse: {
      styleOverrides: {
        root: {
          borderBottomLeftRadius: defaults.borderRadius.main,
          borderBottomRightRadius: defaults.borderRadius.main,
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          ':first-of-type': {
            borderRadius: defaults.borderRadius.main,
          },
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
          borderRadius: defaults.borderRadius.main,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
});
