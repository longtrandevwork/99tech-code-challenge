import { styled } from "styled-components";
import CurrencyInput from "./CurrencyInput";
import { Button, notification } from "antd";
import useGetCurrency from "../hooks/useGetCurrency";
import { useCurrencySwapForm } from "../hooks/useCurrencySwapForm";
import { useMemo } from "react";
import { DefaultOptionType } from "antd/es/select";
import CurrencyOptionLabel from "./CurrencyOptionLabel";
import { getCurrencyIcon } from "../utils/currency";

const FancyFormWrapper = styled(`div`)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.8);
`;

const Title = styled(`span`)`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  padding-bottom: 10px
`;

const FancyForm = () => {
    const { currencyData, currencyDataById, loading } = useGetCurrency()
    const { formik } = useCurrencySwapForm({ currencyDataById });

    const fromCurrencyOptions: DefaultOptionType[] = useMemo(() => {
        return currencyData?.map((item) => ({
            value: item.currency,
            label: <CurrencyOptionLabel key={item.currency} currency={item.currency} icon={getCurrencyIcon(item.currency)} />
        })) ?? []
    }, [currencyData])

    const toCurrencyOptions: DefaultOptionType[] = useMemo(() => {
        return fromCurrencyOptions.filter((item) => item.value !== formik.values.fromCurrency)
    }, [fromCurrencyOptions, formik.values.fromCurrency])

    const onSubmitting = () => {
        formik.setSubmitting(true)

        if (Object.keys(formik.errors).length > 0) {
            formik.setSubmitting(false)

            return notification.error({
                message: 'Error',
                description: Object.values(formik.errors).join(', ')
            })
        }

        formik.submitForm()

        formik.setSubmitting(false)
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <FancyFormWrapper>
            <Title>
                Currency Converter
            </Title>

            <CurrencyInput
                options={fromCurrencyOptions}
                currency={formik.values.fromCurrency}
                amount={formik.values.fromAmount}
                handleCurrencyChange={(value) => formik.setFieldValue('fromCurrency', value)}
                handleAmountChange={(value) => formik.setFieldValue('fromAmount', value)}
            />
            <CurrencyInput
                options={toCurrencyOptions}
                currency={formik.values.toCurrency}
                amount={formik.values.toAmount}
                handleCurrencyChange={(value) => {
                    formik.setFieldValue('toCurrency', value)
                }}
                isDisableInput
            />

            <Button disabled={formik.isSubmitting} type="primary" onClick={onSubmitting}>
                Convert
            </Button>
        </FancyFormWrapper>
    )
}

export default FancyForm;