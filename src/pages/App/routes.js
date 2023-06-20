import Login from '../Login';
import Signup from '../Singup';
import Reservation from '../Reservation';
import MyReservations from '../MyReservations';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import BookmarksIcon from '@mui/icons-material/Bookmarks';

export const routes = [
  {
    id: 'reservation',
    path: '/',
    component: <Reservation />,
    auth: true,
    name: 'Reservation',
    icon: TableRestaurantIcon,
  },
  {
    id: 'my-reservations',
    path: '/my-reservations',
    component: <MyReservations />,
    auth: true,
    name: 'My Reservations',
    icon: BookmarksIcon,
  },
  {
    id: 'login',
    path: '/login',
    component: <Login />,
    auth: false,
  },
  {
    id: 'signup',
    path: '/signup',
    component: <Signup />,
    auth: false,
  },
];
