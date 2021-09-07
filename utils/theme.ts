import { createTheme } from '@material-ui/core/styles';
import { grey, blueGrey, red, teal } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: teal[700],
    },
    secondary: {
      main: blueGrey[600],
    },
    error: {
      main: red[800],
    },
    background: {
      default: grey[100],
    },
  },
});

export default theme;
