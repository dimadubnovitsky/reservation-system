import { useState } from 'react';
import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Toolbar,
  Typography,
} from '@mui/material';
import { NavLink } from 'react-router-dom';
import { routes } from '../../pages/App/routes';

const MyListItem = ({ route }) => {
  const [selected, setSelected] = useState(false);

  return (
    <NavLink
      to={route.path}
      className={({ isActive }) =>
        isActive ? setSelected(true) : setSelected(false)
      }
    >
      <ListItem key={route.id} disablePadding>
        <ListItemButton
          selected={selected}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#E0E0E0',
            },
          }}
        >
          <ListItemIcon>
            <SvgIcon component={route.icon} />
          </ListItemIcon>
          <ListItemText primary={route.name} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
};

const Sidebar = () => (
  <Drawer
    anchor='left'
    variant='permanent'
    PaperProps={{ sx: { backgroundColor: '#FAFAFA' } }}
  >
    <Box sx={{ width: '240px' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' align='center'>
            ASPEX
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        {routes
          .filter((route) => !!route.auth)
          .map((route) => (
            <MyListItem route={route} key={route.id} />
          ))}
      </List>
    </Box>
  </Drawer>
);

export default Sidebar;
