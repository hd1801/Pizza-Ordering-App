import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  AddIngredientDto,
  AddMultiplePizzaIngredientDto,
  AddPizzaIngredientDto,
  CreatePizzaDto,
} from './dto/pizza.dto';
import { PizzaService } from './pizza.service';

@Controller('pizza')
export class PizzaController {
  constructor(private pizzaService: PizzaService) {}

  @Get()
  async getAllPizza() {
    return await this.pizzaService.getAllPizza();
  }

  @Get('ingredients')
  async getIngredients() {
    return await this.pizzaService.getAllIngredients();
  }

  @Get('/:id/ingredients')
  async getIngredientsByID(@Param('id', ParseIntPipe) id: number) {
    return await this.pizzaService.getIngredientsByPizzaId(id);
  }

  @Get('/:id')
  async getPizzaByID(@Param('id', ParseIntPipe) id: number) {
    return await this.pizzaService.getPizzaById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createPizza(@Body() pizza: CreatePizzaDto) {
    return await this.pizzaService.createPizza(pizza);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/ingredient')
  async addIngredient(@Body() ingredient: AddIngredientDto) {
    return await this.pizzaService.addIngredient(ingredient);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/ingredient')
  async addIngredientToPizza(
    @Param('id', ParseIntPipe) pizza_id: number,
    @Body() addingredient: AddPizzaIngredientDto,
  ) {
    return await this.pizzaService.addIngredientToPizza(
      pizza_id,
      addingredient,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/ingredients')
  async addMultipleIngredientToPizza(
    @Param('id', ParseIntPipe) pizza_id: number,
    @Body() addMultipleIngredient: AddMultiplePizzaIngredientDto,
  ) {
    return await this.pizzaService.addMultipleIngredientToPizza(
      pizza_id,
      addMultipleIngredient,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  async deletePizza(@Param('id', ParseIntPipe) pizza_id: number) {
    return this.pizzaService.removePizza(pizza_id);
  }
}
