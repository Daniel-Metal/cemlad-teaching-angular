
export type CartStatus = 'ACT' | 'PAG' ;
export type PaymentMethod = 'CASH' | 'CARD';

export const CART_STATUS_LABELS: Record<CartStatus, string> = {
  ACT: 'Activo',
  PAG: 'Pagado',
};

export const CART_STATUS_ACTIVE: CartStatus = 'ACT';
export const CART_STATUS_PAID: CartStatus = 'PAG';
