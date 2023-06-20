import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logoutRequest } from '../../pages/Login/loginSlice';

const Header = () => {
  const dispatch = useDispatch();
  const onClickLogout = () => dispatch(logoutRequest());

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' sx={{ flexGrow: 1 }}>
            Restaurant Reservation System
          </Typography>
          <Button variant='outlined' color='inherit' onClick={onClickLogout}>
            Log out
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
