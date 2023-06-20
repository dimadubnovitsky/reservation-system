import { Formik, Form } from 'formik';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { loginValidationSchema } from './validationSchema';
import { MuiTextFieldFormik } from '../../../../components/MuiTextFieldFormik';

const initialValues = {
  login: '',
  password: '',
};

const LoginForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={loginValidationSchema}
  >
    {({ isSubmitting, isValid, dirty }) => (
      <Form>
        <Grid container direction='column' alignItems='center' spacing={4}>
          <Grid item>
            <Grid container>
              <Grid item sx={{ width: '100%' }}>
                <MuiTextFieldFormik
                  name='login'
                  label='Login'
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item sx={{ width: '100%' }}>
                <MuiTextFieldFormik
                  name='password'
                  label='Password'
                  type='password'
                  disabled={isSubmitting}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item justifyContent='center'>
            <Button
              type='submit'
              variant='contained'
              disabled={isSubmitting || !isValid || !dirty}
              sx={{ minWidth: '120px' }}
            >
              Log in
            </Button>
          </Grid>
          <Grid item justifyContent='center'>
            <Link to='/signup'>
              <Button
                variant='text'
                color='secondary'
                sx={{ minWidth: '120px' }}
              >
                Sign up
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

export default LoginForm;
