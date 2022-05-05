import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PizzaModule } from './pizza/pizza.module';
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ingredients, Pizza, PizzaIngredients } from './pizza/pizza.model';
import { Cart, CartItems } from './cart/cart.model';
import { Order, OrderItems } from './order/order.model';
import { User } from './user/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'pizzastore',
      synchronize: true,
      autoLoadModels: true,
      models: [
        Pizza,
        PizzaIngredients,
        Ingredients,
        Cart,
        CartItems,
        Order,
        OrderItems,
        User,
      ],
    }),
    PizzaModule,
    CartModule,
    OrderModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
