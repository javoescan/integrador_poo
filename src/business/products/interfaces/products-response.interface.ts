import { Product } from "../products.entity";

export interface ProductsResponse {
  total: number,
  products: Product[],
}