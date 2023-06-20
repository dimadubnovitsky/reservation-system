import { createTheme } from '@mui/material/styles';

const primaryColor = '#005885';
const secondaryColor = '#5244DF';
const spacing = 8;

const theme = createTheme({
  spacing,
  palette: {
    type: 'light',
    primary: {
      main: primaryColor,
      contrastText: '#fff',
    },
    secondary: {
      main: secondaryColor,
      contrastText: '#fff',
    },
  },
});

export default theme;
