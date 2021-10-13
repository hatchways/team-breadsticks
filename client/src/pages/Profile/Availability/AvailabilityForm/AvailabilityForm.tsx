import { Box, TextField } from '@mui/material';
import { TimePicker } from '@mui/lab';
import useStyles from './useStyles';
import { DateRange } from '@mui/lab/DateRangePicker';
import Typography from '@material-ui/core/Typography';

interface RangeSchema {
  sunday?: DateRange<Date | null>;
  monday?: DateRange<Date | null>;
  tuesday?: DateRange<Date | null>;
  wednesday?: DateRange<Date | null>;
  thursday?: DateRange<Date | null>;
  friday?: DateRange<Date | null>;
  saturday?: DateRange<Date | null>;
}

interface RangeValue {
  dateRange: DateRange<Date | null>;
}
interface Props {
  values: any;
  touched: any;
  errors: any;
  dateRange: any;
  day: string;
  updateTime: (arg0: Date, arg1: string, arg2: number) => void;
}

const AvailabilityForm = ({ values, touched, errors, dateRange, day, updateTime }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box className={classes.formWrap} flexDirection="row" display="flex" alignItems="center">
      <Typography variant="button" className={`${classes.m5} ${classes.timeLabel}`}>
        From
      </Typography>
      <Box className={classes.m5}>
        <TimePicker
          inputFormat="hh aaa"
          value={dateRange[day][0]}
          views={['hours']}
          onChange={(newDateTime) => {
            values.dateRange[day][0] = newDateTime;
            updateTime(newDateTime, day, 0);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.hourInput}
              placeholder="Choose Time"
              error={touched.dateRange && Boolean(errors.dateRange)}
            />
          )}
        />
      </Box>
      <Typography variant="button" className={`${classes.m5} ${classes.timeLabel}`}>
        To
      </Typography>
      <Box>
        <TimePicker
          inputFormat="hh aaa"
          value={dateRange[day][1]}
          views={['hours']}
          onChange={(newDateTime) => {
            values.dateRange[day][1] = newDateTime;
            updateTime(newDateTime, day, 1);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.hourInput}
              placeholder="Choose Time"
              error={touched.dateRange && Boolean(errors.dateRange)}
            />
          )}
        />
      </Box>
    </Box>
  );
};

export default AvailabilityForm;
