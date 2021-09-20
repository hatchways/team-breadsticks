import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  profile: {
    height: 'calc(100vh - 90px)',
    backgroundColor: '#eee',
  },
  tempProfileMainSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}));

export default useStyles;
