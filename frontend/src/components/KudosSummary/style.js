const style = theme => ({
  summaryArea: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  cardArea: {
    margin: theme.spacing(2, 2),
    [theme.breakpoints.down('sm')]: {
      borderBottom: '1px solid #DDD',
    },
  },
});

export default style;
