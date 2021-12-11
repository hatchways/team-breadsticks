import React from 'react';
import { Button, IconButton, CssBaseline, Avatar, Typography, Container, Paper, Box } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import useStyles from './useStyles';

export default function ProfilePhoto(): JSX.Element {
  const classes = useStyles();

  return (
    <Container component="main" className={classes.main}>
      <CssBaseline>
        <Paper className={classes.paper}>
          <Box className={classes.box}>
            <Typography variant="h5" className={classes.title}>
              profile photo
            </Typography>
            <Avatar alt="cindy" src="./assets/68f55f.png" className={classes.avatar} />
            <Typography className={classes.typography}>Be sure to use a photo that </Typography>
            <Typography className={classes.typography}> clearly shows your face</Typography>
            <Box className={classes.button}>
              <label htmlFor="button-file">
                <input accept="image/*" id="button-file" multiple type="file" className={classes.input} />
                <Button variant="outlined" color="secondary" size="large" component="span">
                  Upload a file from your device
                </Button>
              </label>
            </Box>
            <IconButton>
              <DeleteOutlineIcon />
              <Typography>Delete photo</Typography>
            </IconButton>
          </Box>
        </Paper>
      </CssBaseline>
    </Container>
  );
}
