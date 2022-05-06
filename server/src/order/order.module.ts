import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderController } from './order.controller';
import { Order, OrderItems } from './order.model';
import { OrderService } from './order.service';

@Module({
  imports: [SequelizeModule.forFeature([Order, OrderItems])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
