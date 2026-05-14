import { Product } from "../../products/models/product.model";
import { CartStatus } from "../enums/cart.enum";

export interface Cart {
  id: number;
  customer_id: number;
  status: CartStatus;
  total: number;
  products?: Product[];
}
