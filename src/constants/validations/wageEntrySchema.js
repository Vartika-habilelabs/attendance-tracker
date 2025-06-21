import * as yup from 'yup';

export const wageEntrySchema = yup.object({
  majdoorId: yup.string().required('Please select a majdoor'),
  date: yup.date().required('Date is required').max(new Date(), 'Date cannot be in the future'),
  amount: yup.number().required('Amount is required').positive('Amount must be positive'),
  note: yup.string().optional(),
}).required(); 