/* eslint-disable prettier/prettier */
import { Box, Typography } from '@material-ui/core';
import { Message } from '../../../../../interface/Conversation';
import moment from 'moment';
import useStyles from './useStyles';

interface Props {
  fullName: string;
  latestMessage?: Message;
}

const ChatBoxContent = ({ fullName, latestMessage }: Props): JSX.Element => {
  const classes = useStyles();
  return (
    <Box display="flex" justifyContent="space-between" className={classes.chatBoxContent}>
      <Box className={classes.chatInfo}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" className={classes.username}>
            {fullName}
          </Typography>
          <Typography className={classes.smallScreenTime}>
            {moment(latestMessage?.createdAt).format('HH:mm')}
          </Typography>
        </Box>
        <Typography variant="body2" className={classes.previewText}>
          {latestMessage?.text}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="center" className={classes.timeInfo}>
        <Typography variant="body2" className={classes.receivedTime} align="right">
          {moment(latestMessage?.createdAt).format('HH:mm[\n]A')}
        </Typography>
      </Box>
    </Box>
  );
};

export default ChatBoxContent;
