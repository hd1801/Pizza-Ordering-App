import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Pizza } from 'src/pizza/pizza.model';
import { Cart, CartItems } from './cart.model';
import { CreateCartDto, CreateCartItemDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartItems) private cartItemsModel: typeof CartItems,
    @InjectModel(Cart) private cartModel: typeof Cart,
  ) {}

  async getCarts() {
    return await Cart.findAll({
      include: { model: CartItems, include: [Pizza] },
    });
  }

  async getCartsByID(id: number) {
    return await Cart.findOne({
      where: { id },
      include: { model: CartItems, include: [Pizza] },
    });
  }

  async createCart(cart: CreateCartDto) {
    return await Cart.create({ ...cart });
  }
  async addCartItems(cartItem: CreateCartItemDto, cart_id: number) {
    return await CartItems.create({ ...cartItem, cart_id });
  }
  async removeCart(cart_id: number) {
    return await Cart.destroy({ where: { cart_id } });
  }
}
