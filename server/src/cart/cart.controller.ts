import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto, CreateCartItemDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCarts() {
    return await this.cartService.getCarts();
  }
  @Get('/user/:id')
  async getCartsByUserId(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.getCartsByUserID(id);
  }
  @Get('/:id')
  async getCartsById(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.getCartsByID(id);
  }

  @Post()
  async createCart(@Body() cart: CreateCartDto) {
    return await this.cartService.createCart(cart);
  }
  @Post('/:id')
  async addcreateCart(
    @Param('id', ParseIntPipe) id: number,
    @Body() cartItem: CreateCartItemDto,
  ) {
    return await this.cartService.addCartItems(cartItem, id);
  }
  @Delete('/item/:id')
  async deleteCartItem(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.removeCartItem(id);
  }
  @Delete('/:id')
  async deleteCart(@Param('id', ParseIntPipe) id: number) {
    return await this.cartService.removeCart(id);
  }
}
