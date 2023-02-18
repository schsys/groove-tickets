export function formatPrice(value) {
    const price = Number(value);

    return `$ ${Math.trunc(price)}`;
}