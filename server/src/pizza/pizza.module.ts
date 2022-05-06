import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredients, Pizza, PizzaIngredients } from './pizza.model';
import { PizzaService } from './pizza.service';
import { PizzaController } from './pizza.controller';

@Module({
  imports: [SequelizeModule.forFeature([Pizza, Ingredients, PizzaIngredients])],
  providers: [PizzaService],
  controllers: [PizzaController],
})
export class PizzaModule {}
