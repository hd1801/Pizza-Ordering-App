import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
export class CreateOrderItemDto {
  @IsNumber()
  @IsNotEmpty()
  pizza_id: number;
}
export class CreateMultipleOrderItemDto {
  @IsArray()
  @IsNotEmpty()
  @IsNumber({}, { each: true })
  pizza_id: number[];
}
