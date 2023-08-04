export default function formatCurrencyNumber(value) {
    return Number(value).toLocaleString(undefined, {
        style: 'currency',
        currency: 'ARS',
    });
}
