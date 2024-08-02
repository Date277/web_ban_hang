export class CreateOrderDto {
  order_id?: number;
  user_id?: string;
  order_name: string;
  email: string;
  phone: number;
  address: string;
  province: string;
  district: string;
  ward: string;
  cart?: any;
}
