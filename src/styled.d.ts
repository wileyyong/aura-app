import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface CustomTheme {
    transparent: {
      main: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
