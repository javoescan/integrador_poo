export interface RedeemCreate {
  products: RedeemProductRequest[]
  userId: string;
}

interface RedeemProductRequest {
  id: string;
}