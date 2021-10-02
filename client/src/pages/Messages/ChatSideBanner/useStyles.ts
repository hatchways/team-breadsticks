import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  chatSideBanner: {
    height: '100%',
    borderRight: '1px solid #eee',
  },
  chatSideBannerBox: {
    padding: theme.spacing(2),
    borderBottom: '1px solid #eee',
  },
  inboxMessages: {
    fontWeight: 700,
    margin: theme.spacing(0, 0, 2, 0.5),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

export default useStyles;