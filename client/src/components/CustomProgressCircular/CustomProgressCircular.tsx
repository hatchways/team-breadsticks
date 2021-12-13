/* eslint-disable prettier/prettier */ import { Box, CircularProgress } from '@material-ui/core';

const CustomProgressCircular = (): JSX.Element => {
  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
      <CircularProgress size={100} />
    </Box>
  );
};

export default CustomProgressCircular;
