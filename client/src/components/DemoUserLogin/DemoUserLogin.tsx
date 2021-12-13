/* eslint-disable prettier/prettier */ import { Button, MenuItem } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import { demoUser } from '../../mocks/demoUser';
import login from '../../helpers/APICalls/login';

interface Props {
  isMenuItem?: boolean;
  classes: string;
}

export default function DemoUserLogin({ isMenuItem, classes }: Props): JSX.Element {
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleDemoUserLogin = () => {
    const { email, password } = demoUser;
    login(email, password).then((data) => {
      if (data.error) {
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        console.error({ data });
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <>
      {isMenuItem ? (
        <MenuItem className={classes} onClick={handleDemoUserLogin}>
          Demo User
        </MenuItem>
      ) : (
        <Button size="large" className={classes} color="primary" variant="outlined" onClick={handleDemoUserLogin}>
          Demo User Login
        </Button>
      )}
    </>
  );
}
