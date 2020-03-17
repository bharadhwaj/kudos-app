import 'typeface-lato';
import { createMuiTheme } from '@material-ui/core/styles';

const CustomThemeObject = {
  typography: {
    fontFamily: '"Lato"',
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
};

const CustomTheme = createMuiTheme(CustomThemeObject);

export default CustomTheme;
