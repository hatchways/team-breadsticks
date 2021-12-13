/* eslint-disable prettier/prettier */ import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Box from '@material-ui/core/Box';
import tempImage from '../../Images/68f55f7799df6c8078a874cfe0a61a5e6e9e1687.png';
import useStyles from './NotificationStyles/NotificationMessages';
import Divider from '@material-ui/core/Divider';
import { Notification } from '../../interface/Notifications';

interface Props {
  messagesToShow: Notification[];
}

export default function NotificationMessages({ messagesToShow }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {messagesToShow.map((message: Notification) => (
        <Box className={!message.read ? classes.unread : classes.read} key={message._id}>
          <Divider />
          <Grid container spacing={1}>
            <Grid item>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={tempImage} />
              </ButtonBase>
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="subtitle1" className={classes.title}>
                    {message.title}
                  </Typography>
                  <Typography gutterBottom variant="body2" color="textSecondary" className={classes.type}>
                    {message.type}
                  </Typography>
                  <Typography variant="body2" gutterBottom className={classes.date}>
                    {new Date(message.createdAt).toLocaleDateString('en-US')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
