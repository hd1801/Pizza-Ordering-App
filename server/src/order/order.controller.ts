import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { CreateOrderDto, CreateOrderItemDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async getAllOrders() {
    return await this.orderService.getOrders();
  }
  @Get('/user/:id')
  async getOrderById(@Param('id', ParseIntPipe) user_id: number) {
    return await this.orderService.getOrdersByUserId(user_id);
  }
  @Get('/:id')
  async getOrderByUserId(@Param('id', ParseIntPipe) order_id: number) {
    return await this.orderService.getOrdersById(order_id);
  }
  @Post()
  async createCart(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }
  @Post('/:id')
  async addcreateCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() cartItem: CreateOrderItemDto,
  ) {
    return await this.orderService.addOrderItems(cartItem, id);
  }
}
