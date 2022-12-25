
import { createTheme } from '@material-ui/core/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#EFEFEF',
      common: '#D2001A'
    },
    secondary: {
      main: '#FFFAE7',
    },
    error: {
      main: '#FFDE00',
    },
    background: {
      main: '#618833',
    },
  },
  overrides: {
    '@global': {
      div: {
        padding: 0, // remove the default padding for all div elements
      },
    },
  },
});

export default theme;