import { useState } from 'react';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { Formik, Form } from 'formik';
import DayField from '../FromFields/DayField';
import TimeField from '../FromFields/TimeField';
import NumberGuestsField from '../FromFields/NumberGuestsField';
import { reservationValidationSchema } from './validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { createReservationRequest } from '../../reservationSlice';
import { getNumberGuestsOnTables } from '../../../../utils/getNumberGuestsOnTables';

const steps = ['Choose a day', 'Choose a time', 'Enter the number of guests'];

const renderStepContent = (
  step,
  isSubmitting,
  values,
  reservations,
  guestsOnTables,
  tables,
) => {
  switch (step) {
    case 0:
      return <DayField name='day' isSubmitting={isSubmitting} />;
    case 1:
      return (
        <TimeField
          name='time'
          isSubmitting={isSubmitting}
          values={values}
          reservations={reservations}
          guestsOnTables={guestsOnTables}
          tables={tables}
        />
      );
    case 2:
      return (
        <NumberGuestsField
          name='guests'
          isSubmitting={isSubmitting}
          values={values}
          reservations={reservations}
          guestsOnTables={guestsOnTables}
        />
      );
    default:
      return <div>Not Found</div>;
  }
};

const initialValues = { day: '', time: '', guests: '' };

const ReservationForm = ({ reservations, tables }) => {
  const [activeStep, setActiveStep] = useState(0);
  const userId = useSelector((state) => state.login.user?.id);
  const dispatch = useDispatch();
  const currentValidationSchema = reservationValidationSchema[activeStep];
  const isLastStep = activeStep === steps.length - 1;
  const guestsOnTables = getNumberGuestsOnTables(tables);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const onSubmit = (values, { setTouched, setSubmitting, resetForm }) => {
    if (isLastStep) {
      new Promise((resolve, reject) => {
        dispatch(
          createReservationRequest({
            values,
            tables,
            userId,
            reservations,
            resolve,
            reject,
          }),
        );
      })
        .finally(() => setSubmitting(false))
        .then(() => {
          resetForm();
          setActiveStep(0);
        })
        .catch((error) => console.log(error));
    } else {
      setActiveStep(activeStep + 1);
      setTouched({});
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box paddingTop={4}>
        <Formik
          initialValues={initialValues}
          validationSchema={currentValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting, values }) => (
            <Form>
              {renderStepContent(
                activeStep,
                isSubmitting,
                values,
                reservations,
                guestsOnTables,
                tables,
              )}
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}>
                {activeStep > 0 && (
                  <Button
                    variant='outlined'
                    color='inherit'
                    disabled={isSubmitting}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: '1 1 auto' }} />
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting}
                >
                  {activeStep === steps.length - 1 ? 'Reserve' : 'Next'}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

export default ReservationForm;
