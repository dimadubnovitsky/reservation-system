import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './pages/Login/loginSlice';
import signupReducer from './pages/Singup/signupSlice';
import notificationReducer from './components/Notification/notificationSlice';
import reservationReducer from './pages/Reservation/reservationSlice';
import tablesReducer from './pages/Reservation/tablesSlice';

export const rootReducer = combineReducers({
  login: loginReducer,
  signup: signupReducer,
  notification: notificationReducer,
  reservation: reservationReducer,
  tables: tablesReducer,
});
