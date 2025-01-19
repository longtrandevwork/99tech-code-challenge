interface WalletBalance {
    currency: string;
    amount: number;
}
// FormattedWalletBalance is a WalletBalance with a formatted amount
interface FormattedWalletBalance extends WalletBalance {
    formatted: string;
}

interface Props extends BoxProps {

}

// Using Object mapping to get the priority of the blockchain instead of using switch case.
const PRIORITY_MAPPING = {
    'Osmosis': 100,
    'Ethereum': 50,
    'Arbitrum': 30,
    'Zilliqa': 20,
    'Neo': 20,
}

//declare the function outer of the component to avoid re-declaring the function every time the component is rendered.
//this should be place in a separate file and export it to be used in other files.
const getPriority = (blockchain: string): number => {
    return PRIORITY_MAPPING[blockchain] || -99;
}

// React component should only need React.FC or React.ComponentType depending on the code convention of the project but here it is using both.
// It try to splice the props into children and rest, so ComponentType should be used here. ComponentType is not included children in the props.
const WalletPage = (props: Props) => {
    const balances = useWalletBalances();
    const prices = usePrices();

    //if useWalletBalances and usePrices are returning typed data, it is better to use the type instead of defining type here.
    const sortedBalances = useMemo(() => {
        return balances.filter((balance) => {
            const balancePriority = getPriority(balance.blockchain);
            // lhsPriority may be a typo, it should be balancePriority
            // nested if statement is not needed, it can be combined into one if statement.

            return balancePriority !== -99 && balance.amount > 0;
        }).sort((lhs, rhs) => {
            const leftPriority = getPriority(lhs.blockchain);
            const rightPriority = getPriority(rhs.blockchain);

            return leftPriority > rightPriority ? -1 : 1;
        });
    // prices is not used in filtering and sorting the balances, so it should not be included in the dependency array.
    }, [balances]);

    // formattedBalances can be created in the useMemo to avoid re-creating the formattedBalances every time the component is rendered.
    // formattedBalances can be calculated in row creation to optimize the code. ( reducing the number of loops )
    // rows also need to be memoized to avoid re-creating the rows every time the component is rendered.
    const rows = useMemo(() => sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
        const usdValue = prices[balance.currency] * balance.amount;
        const formatted = balance.amount.toFixed()

        return (
            <WalletRow
                className={classes.row}
                key={index}
                amount={balance.amount}
                usdValue={usdValue}
                formattedAmount={formatted}
            />
        )
    }), [sortedBalances, prices]); 

    return (
        <div {...props}>
            {rows}
        </div>
    )
}