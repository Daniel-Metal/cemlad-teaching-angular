export interface CartProduct {
  product_id: number;
  product_name: string;
  price: number;
}

export interface Cart {
  id: number;
  customer_id: number;
  status: CartStatus;
  total: number;
  products: CartProduct[];
}

export type CartStatus = 'ACT' | 'PAID' | 'CANC';
export type PaymentMethod = 'CASH' | 'CARD';

export const CART_STATUS_LABELS: Record<CartStatus, string> = {
  ACT: 'Activo',
  PAID: 'Pagado',
  CANC: 'Cancelado',
};
