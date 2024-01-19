import React, { useEffect } from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/auth'

const Profile = () => {
  const { user } = useSelector(userSelector);
  const favouriteMovies = [];

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favouriteMovies.length
      ? <Typography varaiant="h5">Add favourites or watchlist to see them here!</Typography>
      : <Box>
        FAVOURITE MOVIES
      </Box>}
    </Box>
  );
};

export default Profile;
