import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00bcd4' },
    background: { default: '#18191A', paper: '#23272F' },
  },
  typography: {
    fontFamily: 'Inter, Roboto, Arial, sans-serif',
  },
});

export default darkTheme;