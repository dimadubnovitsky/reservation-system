import * as Yup from 'yup';

export const reservationValidationSchema = [
  Yup.object().shape({
    day: Yup.string().required('Required'),
  }),
  Yup.object().shape({
    time: Yup.string().required('Required'),
  }),
  Yup.object().shape({
    guests: Yup.string().required('Required'),
  }),
];
