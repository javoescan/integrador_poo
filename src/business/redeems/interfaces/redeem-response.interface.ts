import { Redeem } from "../redeems.entity";

export interface RedeemsResponse {
  total: number,
  redeems: Redeem[],
}