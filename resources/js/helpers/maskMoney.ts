export const maskMoney = (value: string | number | undefined | null) => {
    if (value === undefined || value === null) return '0,00';

    const digits = String(value).replace(/\D/g, '');

    if (!digits) return '0,00';

    const amount = Number(digits) / 100;

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

export const formatCurrencyView = (value: number | string) => {
    const val = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(val)) return '0,00';

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(val);
};
