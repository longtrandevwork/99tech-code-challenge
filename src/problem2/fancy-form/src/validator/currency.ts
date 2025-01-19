import * as Yup from 'yup';

export const currencyFormSchema = Yup.object().shape({
    fromCurrency: Yup.string().required('From currency is required'),
    toCurrency: Yup.string().required('To currency is required'),
    fromAmount: Yup.number()
        .required('From amount is required')
        .positive('From amount must be positive'),
});
