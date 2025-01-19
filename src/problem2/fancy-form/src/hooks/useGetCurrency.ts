import { useState, useEffect } from 'react';
import { CurrencyApi } from '../types/currency-api';
import { isEmptyString } from '../utils/string';

const useGetCurrency = () => {
    const [currencyDataById, setCurrencyDataById] = useState<{[key: string]: CurrencyApi}>();
    const [loading, setLoading] = useState(true);

    const fetchCurrencyData = async () => {
        try {
            setLoading(true)

            const response = await fetch('https://interview.switcheo.com/prices.json');

            if (!response.ok) {
                throw new Error('Failed to fetch currency data');
            }

            const data = await response.json();

            const filteredDataMapping: {[key: string]: CurrencyApi} = {}

            data.forEach((item: CurrencyApi) => {
                if (isEmptyString(item.currency)) return
                if (!filteredDataMapping[item.currency]) filteredDataMapping[item.currency] = item
            })

            setCurrencyDataById(filteredDataMapping);
            setLoading(false)
        } catch (err) {
            console.log(err)
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchCurrencyData();
    }, []);

    return { 
        currencyData: currencyDataById ? Object.values(currencyDataById): undefined, 
        currencyDataById,
        loading,
    };
};

export default useGetCurrency;
