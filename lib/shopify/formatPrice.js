export default function FormatPrice(number) {
    return new Intl.NumberFormat('en-us', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(number)
}