import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddIngredientDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
export class CreatePizzaDto {
  @IsNotEmpty()
  @IsString()
  crust_size: string;
}
export class AddPizzaIngredientDto {
  @IsNotEmpty()
  @IsNumber()
  ingredient_id: number;
}
export class AddMultiplePizzaIngredientDto {
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  ingredient_id: number[];
}
