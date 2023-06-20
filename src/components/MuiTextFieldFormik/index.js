import { useField } from 'formik';
import { TextField } from '@mui/material';
import { CustomInput } from '../CustomInput';

export const MuiTextFieldFormik = ({
  label,
  disabled,
  inputType = null,
  type = 'text',
  ...props
}) => {
  const [field, meta] = useField(props);
  const { touched, error } = meta;
  const isError = touched && !!error;

  return (
    <TextField
      label={label}
      error={isError}
      helperText={isError && error}
      {...field}
      type={type}
      fullWidth
      variant='outlined'
      margin='normal'
      InputProps={
        inputType && {
          inputComponent: CustomInput,
          inputProps: {
            type: inputType,
          },
        }
      }
      disabled={disabled}
    />
  );
};
