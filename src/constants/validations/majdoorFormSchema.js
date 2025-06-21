import * as yup from 'yup';

export const majdoorFormSchema = yup.object({
  firstName: yup.string().required('First name is required').min(2, 'First name must be at least 2 characters'),
  lastName: yup.string().required('Last name is required').min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: yup.date().required('Date of birth is required').max(new Date(), 'Date of birth cannot be in the future'),
  aadharNumber: yup
    .string()
    .required('Aadhar number is required')
    .matches(/^\d{12}$/, 'Aadhar number must be exactly 12 digits'),
}).required(); 