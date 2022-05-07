import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pizza } from 'src/pizza/pizza.model';
import {
  CreateOrderDto,
  CreateOrderItemDto,
  CreateMultipleOrderItemDto,
} from './dto/order.dto';
import { Order, OrderItems } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order) private OrderModel: typeof Order,
    @InjectModel(OrderItems) private OrderItemModel: typeof OrderItems,
  ) {}

  async getOrders() {
    return await this.OrderModel.findAll({
      include: { model: OrderItems, include: [Pizza] },
    });
  }
  async getOrdersById(order_id: number) {
    return await this.OrderModel.findAll({
      where: { order_id },
      include: { model: OrderItems, include: [Pizza] },
    });
  }
  async getOrdersByUserId(user_id: number) {
    return await this.OrderModel.findAll({
      where: { user_id },
      include: { model: OrderItems, include: [Pizza] },
    });
  }
  async createOrder(order: CreateOrderDto) {
    return this.OrderModel.create({ ...order });
  }
  async addOrderItem(orderItem: CreateOrderItemDto, order_id: number) {
    return this.OrderItemModel.create({ ...orderItem, order_id });
  }
  async addOrderItems(
    orderItems: CreateMultipleOrderItemDto,
    order_id: number,
  ) {
    Logger.log(orderItems);
    for (const pizza_id of orderItems.pizza_id) {
      await this.OrderItemModel.create({ pizza_id, order_id });
    }
    return await this.OrderItemModel.findAll({ where: { order_id } });
  }
}
