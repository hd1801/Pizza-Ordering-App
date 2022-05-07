import {
  Controller,
  Get,
  Post,
  Param,
  ParseIntPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  CreateMultipleOrderItemDto,
  CreateOrderDto,
  CreateOrderItemDto,
} from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  async getAllOrders() {
    return await this.orderService.getOrders();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/user/:id')
  async getOrderById(@Param('id', ParseIntPipe) user_id: number) {
    return await this.orderService.getOrdersByUserId(user_id);
  }
  @Get('/:id')
  async getOrderByUserId(@Param('id', ParseIntPipe) order_id: number) {
    return await this.orderService.getOrdersById(order_id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createCart(@Body() order: CreateOrderDto) {
    return await this.orderService.createOrder(order);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/item')
  async addOrderItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderItem: CreateOrderItemDto,
  ) {
    return await this.orderService.addOrderItem(orderItem, id);
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('/:id/items')
  async addOrderItems(
    @Param('id', ParseIntPipe) id: number,
    @Body() orderItem: CreateMultipleOrderItemDto,
  ) {
    return await this.orderService.addOrderItems(orderItem, id);
  }
}
