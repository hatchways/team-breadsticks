import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

interface Props {
  endTime?: Date;
  startTime?: Date;
}

export default function TimeDisplay({ endTime, startTime }: Props): JSX.Element {
  const pageStyles = makeStyles((theme: Theme) =>
    createStyles({
      BookingSubHr: {
        fontWeight: 600,
        fontSize: '12px',
        color: 'black',
      },
    }),
  );
  const pageClasses = pageStyles();

  const endDate = endTime ? new Date(endTime) : new Date();
  const startDate = startTime ? new Date(startTime) : new Date();
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minutes: 'numeric' } as const;

  const timeEnd = endDate.toLocaleDateString('en-US', options);
  const timeStart = startDate.toLocaleDateString('en-US', options);

  return (
    <Box>
      <Typography variant="body2" color="textSecondary">
        From
      </Typography>
      <Typography variant="body2" gutterBottom className={pageClasses.BookingSubHr}>
        {timeStart}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        To
      </Typography>
      <Typography variant="body2" gutterBottom className={pageClasses.BookingSubHr}>
        {timeEnd}
      </Typography>
    </Box>
  );
}
