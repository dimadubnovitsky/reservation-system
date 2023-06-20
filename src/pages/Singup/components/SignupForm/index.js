import { Formik, Form } from 'formik';
import { Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { signupValidationSchema } from './validationSchema';
import { MuiTextFieldFormik } from '../../../../components/MuiTextFieldFormik';

const initialValues = {
  login: '',
  phone: '',
  password: '',
};

const SignupForm = ({ onSubmit }) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
    validationSchema={signupValidationSchema}
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
                  name='phone'
                  label='Phone'
                  inputType='phone'
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
              Sign up
            </Button>
          </Grid>
          <Grid item justifyContent='center'>
            <Link to='/login'>
              <Button
                variant='text'
                color='secondary'
                sx={{ minWidth: '120px' }}
              >
                Log in
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Form>
    )}
  </Formik>
);

export default SignupForm;
