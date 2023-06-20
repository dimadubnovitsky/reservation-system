import { useDispatch, useSelector } from 'react-redux';
import { notificationClose } from './notificationSlice';
import { Alert, Snackbar } from '@mui/material';
import Slide from '@mui/material/Slide';

const Notification = () => {
  const dispatch = useDispatch();
  const { isOpen, type, message } = useSelector((state) => state.notification);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(notificationClose());
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      TransitionComponent={Slide}
    >
      <Alert onClose={handleClose} severity={type} variant='filled'>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
