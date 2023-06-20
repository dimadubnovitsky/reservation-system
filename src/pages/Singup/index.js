import { Grid, Paper, Typography } from '@mui/material';
import SignupForm from './components/SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signupRequest } from './signupSlice';
import LoadingIndicator from '../../components/LoadingIndicator';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.signup.isLoading);
  const onSubmit = (values, { setSubmitting, resetForm }) => {
    new Promise((resolve, reject) => {
      dispatch(signupRequest({ values, resolve, reject }));
    })
      .finally(() => setSubmitting(false))
      .then(() => {
        navigate('/login');
        resetForm();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid
      container
      justifyContent='center'
      alignItems='center'
      sx={{
        height: '100%',
        backgroundColor: '#3e3e3e',
      }}
    >
      <Grid item>
        <Paper
          elevation={10}
          sx={{
            width: '500px',
            padding: '30px',
          }}
        >
          <Grid container direction='column' spacing={4}>
            <Grid item>
              <Typography
                align='center'
                variant='subtitle1'
                color='textSecondary'
              >
                Sign up in the Restaurant Reservation System
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                position: 'relative',
              }}
            >
              <SignupForm onSubmit={onSubmit} />
              {isLoading && <LoadingIndicator />}
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
export default Signup;
