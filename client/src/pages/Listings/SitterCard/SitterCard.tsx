import { Grid, Box, Card, CardContent, Avatar, Rating, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import useStyles from './useStyles';
import { Sitter } from '../../Profile/ProfileDetail/sampleData';
import { Link } from 'react-router-dom';

interface Props {
  sitter: Sitter;
}

const SitterCard = ({ sitter }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={5} md={4} className={classes.root}>
      <Box width="80%" display="flex" justifyContent="center" alignItems="center" className={classes.sitterOuterBox}>
        <Card raised>
          <CardContent
            component={Box}
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar
              variant="circular"
              className={classes.avatar}
              src={sitter.userProfileImage}
              alt={`${sitter.sitterFirstName}-${sitter.sitterLastName}-profile-image`}
              component={Link}
              to={`/listings/${sitter.sitterId}`}
            />
            <Typography component="h5" variant="h5" className={classes.sitterName}>
              {`${sitter.sitterFirstName} ${sitter.sitterLastName}`}
            </Typography>
            <Typography variant="body2" className={classes.sitterShortDesc}>
              {sitter.sitterShortDesc}
            </Typography>
            <Rating name="read-only" size="small" value={sitter.sitterRating} readOnly className={classes.rating} />
            <Typography variant="body1" align="center" className={classes.sitterAboutMe}>
              {sitter.sitterAboutMe.slice(0, 60)}
            </Typography>
            <Box
              width="95%"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              className={classes.locationWage}
            >
              <Box display="flex" alignItems="center">
                <LocationOnIcon className={classes.locationIcon} />
                <Typography variant="body2" sx={{ ml: 0.5 }} className={classes.locationText}>
                  {`${sitter.sitterCity}, ${sitter.sitterProvince}`}
                </Typography>
              </Box>
              <Typography component="h6" variant="h6" align="center" className={classes.wage}>
                ${sitter.sitterWage}/hr
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Grid>
  );
};

export default SitterCard;
