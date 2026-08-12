// Formata os dígitos crus do estado para exibir no input (ex: "199945" -> "1.999,45")
export const maskMoney = (value: string | number | undefined | null) => {
    if (!value && value !== 0) return '';

    // Se vier como número direto do banco (ex na edição), converte para string de dígitos
    let digits = '';
    if (typeof value === 'number') {
        digits = Math.round(value * 100).toString();
    } else {
        digits = String(value).replace(/\D/g, '');
    }

    if (!digits) return '';

    const amount = Number(digits) / 100;

    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

// Converte os dígitos crus do estado para float real antes de enviar para o Laravel
export const parseMoney = (
    value: string | number | null | undefined,
): number | null => {
    if (!value && value !== 0) return null;
    if (typeof value === 'number') return value;

    const digits = String(value).replace(/\D/g, '');
    if (!digits) return null;

    return Number(digits) / 100;
};

// Formata para exibir na tabela de listagem
export const formatCurrencyView = (
    value: number | string | null | undefined,
) => {
    if (value === null || value === undefined || value === '') return 'R$ 0,00';

    const val = typeof value === 'string' ? parseFloat(value) : value;

    if (isNaN(val)) return 'R$ 0,00';

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(val);
};
