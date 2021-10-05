import { useState, SyntheticEvent } from 'react';
import { Grid, Box, Typography, Button } from '@mui/material';
import { DateRange } from '@mui/lab/DateRangePicker';
import Layout from '../Layout/Layout';
import SearchLocation from './SearchLocation/SearchLocation';
import SearchDateRange from './SearchDateRange/SearchDateRange';
import SitterCard from './SitterCard/SitterCard';
import { Sitter, sampleData } from '../Profile/ProfileDetail/sampleData';
import useStyles from './useStyles';

const Listings = (): JSX.Element => {
  const [dateRange, setDateRange] = useState<DateRange<Date | null>>([null, null]);
  const [search, setSearch] = useState<string>('test');
  const [newSitter, setNewSitter] = useState<Sitter | null>(null);
  const classes = useStyles();

  const searchLocationHandleChange = (e: SyntheticEvent<Element, Event>, newInputValue: string) => {
    setSearch(newInputValue);
    if (newSitter) {
      setNewSitter(null);
    }
  };

  const searchDateRangeHandleChange = (newDateRange: DateRange<Date>) => {
    setDateRange(newDateRange);
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const handleShowMore = () => {};

  return (
    <Layout>
      <Grid className={classes.listings}>
        <Box
          height="50px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.searchTitleBox}
        >
          <Typography component="h4" variant="h4" align="center" className={classes.searchTitleText}>
            Your search results
          </Typography>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.searchBox}>
          <SearchLocation search={search} handleChange={searchLocationHandleChange} />
          <SearchDateRange dateRange={dateRange} handleChange={searchDateRangeHandleChange} />
        </Box>

        <Grid container className={classes.sitterLists} justifyContent="space-evenly">
          {sampleData.slice(0, 6).map((sitter) => (
            <SitterCard key={sitter.sitterId} sitter={sitter} />
          ))}
        </Grid>
        <Box display="flex" justifyContent="center" alignItems="center" className={classes.showMoreBox}>
          <Button variant="outlined" onClick={handleShowMore} className={classes.showMoreBtn}>
            Show More
          </Button>
        </Box>
      </Grid>
    </Layout>
  );
};

export default Listings;
