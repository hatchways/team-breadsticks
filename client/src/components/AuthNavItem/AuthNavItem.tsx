/* eslint-disable prettier/prettier */ import { NavLink } from 'react-router-dom';
import { Button, Typography } from '@material-ui/core';

interface Props {
  isButton?: boolean;
  linkTo: string;
  asideText?: string;
  btnText?: string;
  classes: string;
  variant?: 'contained' | 'outlined' | 'text';
}

const AuthNavItem = ({ isButton, linkTo, classes, asideText, btnText, variant }: Props): JSX.Element => {
  return (
    <>
      {isButton ? (
        <Button
          component={NavLink}
          to={linkTo}
          className={classes}
          activeStyle={variant === 'contained' ? { color: '#ffffff' } : { color: '#f04040' }}
          color="primary"
          variant={variant}
        >
          {btnText}
        </Button>
      ) : (
        <Typography className={classes} component={NavLink} to={linkTo} activeStyle={{ color: '#f04040' }}>
          {asideText}
        </Typography>
      )}
    </>
  );
};

export default AuthNavItem;
