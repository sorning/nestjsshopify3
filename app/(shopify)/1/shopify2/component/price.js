const Price=({
    amount,
    currencyCode='USD',
    ...props
})=>(
    <p suppressHydrationWarning={true} {...props}>
        {`${new Intl.NumberFormat(undefined, {
            style: 'currency',
            currency:currencyCode,
            currencyDisplay: 'narrowSymbol'
        }).format(parseFloat(amount))} ${currencyCode}`}
    </p>
)

export default Price