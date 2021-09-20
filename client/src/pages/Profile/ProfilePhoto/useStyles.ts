import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  profilePhoto: {
    height: 'calc(100vh - 90px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
}));

export default useStyles;
