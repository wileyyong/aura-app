import "@mui/material/styles"

declare module '@mui/material/styles' {
  interface CustomTheme {
    myField?: {
      myNestedField?: string;
    };
  }

  interface Theme extends CustomTheme {}
  interface ThemeOptions extends CustomTheme {}
}
