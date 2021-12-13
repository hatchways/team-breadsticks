/* eslint-disable prettier/prettier */ import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import React, { useEffect } from 'react';
import useStyles from './NotificationStyles/NotificationPopover';
import NotificationMessages from './NotificationMessages';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { getNotifications, updReadNotifications } from '../../helpers/APICalls/notifications';
import { Notification } from '../../interface/Notifications';
import { NavLink } from 'react-router-dom';

export default function NotificationPopover(): JSX.Element {
  const classes = useStyles();
  const returnNotificationType = (res: any): Notification[] => res.notifications;
  const messages: Notification[] = [];
  const [messagesToShow, setmessagesToShow] = React.useState(messages);

  useEffect(() => {
    const fetchNotifications = async () => {
      const res = await getNotifications(1, 3, true);
      const messagesCopy = returnNotificationType(res);
      if (messagesCopy) setmessagesToShow(messagesCopy);

      if (messagesCopy.length > 0) {
        const notificationsIds = messagesCopy.map((notifs) => notifs._id);
        await updReadNotifications(notificationsIds);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <Box className={`${classes.root} ${classes.popoverWrap}`}>
      <Paper className={classes.paper}>
        {messagesToShow.length < 1 ? (
          <Box>
            <Typography variant="subtitle1" className={classes.title}>
              No unread notifications.
            </Typography>
          </Box>
        ) : (
          <NotificationMessages messagesToShow={messagesToShow} />
        )}
        <Box className={classes.footerWrap}>
          <Button component={NavLink} to={'/notifications'}>
            Show all notifications
            <OpenInNewIcon />
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
