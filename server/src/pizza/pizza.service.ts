import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  AddIngredientDto,
  AddMultiplePizzaIngredientDto,
  AddPizzaIngredientDto,
  CreatePizzaDto,
} from './dto/pizza.dto';
import { Ingredients, Pizza, PizzaIngredients } from './pizza.model';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza)
    private pizzaModel: typeof Pizza,
    @InjectModel(Ingredients)
    private ingredientModel: typeof Ingredients,
    @InjectModel(PizzaIngredients)
    private pizzaIngredientsModel: typeof PizzaIngredients,
  ) {}
  async getAllPizza() {
    return this.pizzaModel.findAll({ include: [PizzaIngredients] });
  }
  async getPizzaById(pizza_id: number) {
    return this.pizzaModel.findOne({
      where: { pizza_id },
      include: [PizzaIngredients],
    });
  }
  async getAllIngredients() {
    return this.ingredientModel.findAll({});
  }
  async getIngredientById(ingredient_id: number) {
    return this.ingredientModel.findOne({ where: { ingredient_id } });
  }
  async addIngredient(ingredient: AddIngredientDto) {
    return this.ingredientModel.create({ ...ingredient });
  }
  async createPizza(pizza: CreatePizzaDto) {
    //check crust size and set initial price accordingly
    const price =
      pizza.crust_size === 'small'
        ? 80
        : pizza.crust_size === 'medium'
        ? 120
        : 180;
    return this.pizzaModel.create({ ...pizza, price });
  }
  async addIngredientToPizza(
    pizza_id: number,
    pizzaIngredient: AddPizzaIngredientDto,
  ) {
    const price = (await this.getIngredientById(pizzaIngredient.ingredient_id))
      .price;
    this.updatePrice(price, pizza_id);
    return this.pizzaIngredientsModel.create({ pizza_id, ...pizzaIngredient });
  }
  async getIngredientsByPizzaId(pizza_id: number) {
    const pizzaingredients = await this.pizzaIngredientsModel.findAll({
      where: { pizza_id },
    });
    const ingredient_id = await pizzaingredients.map(
      (item) => item.ingredient_id,
    );
    const ingredients = await this.ingredientModel.findAll({
      where: { ingredient_id },
    });
    return ingredients;
  }
  //Take One Pizza ID and array of IngredientId add each array item with given pizza id.
  async addMultipleIngredientToPizza(
    pizza_id: number,
    pizzaIngredient: AddMultiplePizzaIngredientDto,
  ) {
    for (const ingredient_id of pizzaIngredient.ingredient_id) {
      this.pizzaIngredientsModel.create({
        pizza_id,
        ingredient_id,
      });
      this.updatePrice(
        (await this.getIngredientById(ingredient_id)).price,
        pizza_id,
      );
    }
    return this.getIngredientsByPizzaId(pizza_id);
  }
  async updatePrice(increment: number, pizza_id: number) {
    const price =
      (
        await this.pizzaModel.findOne({
          attributes: ['price'],
          where: { pizza_id },
        })
      ).price + increment;
    return this.pizzaModel.update({ price }, { where: { pizza_id } });
  }
  async removePizza(pizza_id: number) {
    return this.pizzaModel.destroy({ where: { pizza_id } });
  }
}
