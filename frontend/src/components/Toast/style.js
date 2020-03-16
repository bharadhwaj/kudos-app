import { amber, blue, green, red } from '@material-ui/core/colors';

const style = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: red[500],
  },
  info: {
    backgroundColor: blue[400],
  },
  warning: {
    backgroundColor: amber[800],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default style;
