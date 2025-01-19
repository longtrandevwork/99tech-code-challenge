import { Input, Select, SelectProps, Space } from "antd"
import { isEmptyString } from "../utils/string"
import styled from "styled-components"

const CurrencySelect = styled(Select)`
width: 300px;
`;

const AmountInput = styled(Input)`
&.ant-input[disabled] {
    background-color: #f5f5f5; /* Lighter background */
    border-color: #d9d9d9; /* Lighter border */
    color: rgba(0, 0, 0, 0.25); /* Lighter text color */
    }
    `;

interface CurrencyInputProps {
    options: SelectProps["options"]
    currency?: string
    amount?: number
    handleCurrencyChange: (currency?: string) => void
    handleAmountChange?: (amount?: number) => void
    isDisableInput?: boolean
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
    currency,
    amount,
    options,
    handleCurrencyChange,
    handleAmountChange = () => { },
    isDisableInput = false
}) => {
    const onNumericInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        const numericValue = !isEmptyString(value) ? parseFloat(event.target.value) : undefined

        handleAmountChange(numericValue)
    }

    const onCurrencyChange = (value: unknown) => {
        if (typeof value === "string") {
            handleCurrencyChange(value);
        }
    }

    return (
        <Space.Compact>
            <CurrencySelect
                value={currency}
                options={options}
                onChange={onCurrencyChange}
            />
            <AmountInput
                type="number"
                disabled={isDisableInput}
                value={amount}
                onChange={onNumericInputChange}
            />
        </Space.Compact>
    )
}

export default CurrencyInput