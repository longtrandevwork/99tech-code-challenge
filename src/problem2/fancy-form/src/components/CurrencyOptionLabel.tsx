import { Avatar, Typography } from "antd";
import { styled } from "styled-components";

const CurrencyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

interface CurrencyOptionLabelProps {
    currency: string;
    icon: string;
}

const CurrencyOptionLabel: React.FC<CurrencyOptionLabelProps> = ({
    currency,
    icon,
}) => {
    return (
        <CurrencyWrapper>
            <Avatar src={icon} size={24} alt={currency} />
            <Typography.Text>
                {currency}
            </Typography.Text>
        </CurrencyWrapper>
    )
}

export default CurrencyOptionLabel;