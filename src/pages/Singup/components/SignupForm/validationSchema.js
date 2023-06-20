import * as Yup from 'yup';

const phoneRegExp = /^(\+7)\s\([0-9]{3}\)\s[0-9]{3}-[0-9]{2}-[0-9]{2}$/;

export const signupValidationSchema = Yup.object({
  login: Yup.string().required('Required'),
  phone: Yup.string()
    .required('Required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  password: Yup.string()
    .required('Required')
    .min(8, 'Password is too short - must be at least 8 characters'),
});
