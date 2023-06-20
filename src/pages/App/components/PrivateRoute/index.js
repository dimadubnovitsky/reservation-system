import { Navigate, Outlet } from 'react-router-dom';
import Header from '../../../../components/Header';
import Sidebar from '../../../../components/Sidebar';
import { Box, Paper } from '@mui/material';

const PrivateRoute = ({ isAuth }) => {
  if (!isAuth) {
    return <Navigate to='/login' />;
  }
  return (
    <Box paddingLeft={30}>
      <Header />
      <Sidebar />
      <Box padding={4}>
        <Paper>
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
};

export default PrivateRoute;
