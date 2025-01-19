import { useFormik } from "formik";
import { currencyFormSchema } from "../validator/currency";
import { FORM_CURRENCY_INITIAL_VALUE } from "../constants/form_currency";
import { CurrencyForm } from "../types/currency";
import { CurrencyApi } from "../types/currency-api";

type UseCurrencySwapForm = {
    currencyDataById?: {[key: string]: CurrencyApi};
}

export const useCurrencySwapForm = ({ currencyDataById }: UseCurrencySwapForm) => {
    const formik = useFormik<CurrencyForm>({
        initialValues: FORM_CURRENCY_INITIAL_VALUE,
        onSubmit: values => {
            const {
                fromCurrency,
                toCurrency,
                fromAmount,
            }= values

            if (!fromCurrency || !toCurrency || !fromAmount || !currencyDataById) return;

            const fromCurrencyData = currencyDataById[fromCurrency];
            const toCurrencyData = currencyDataById[toCurrency];

            const ratio = fromCurrencyData.price / toCurrencyData.price;
            const toAmount = fromAmount * ratio;

            formik.setFieldValue('toAmount', toAmount);
        },
        validationSchema: currencyFormSchema,
    });

    return {
        formik,
    }
}