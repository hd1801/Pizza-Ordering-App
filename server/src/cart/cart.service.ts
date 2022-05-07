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
    return await this.cartModel.findAll({
      include: { model: CartItems, include: [Pizza] },
    });
  }

  async getCartsByID(id: number) {
    return await this.cartModel.findOne({
      where: { id },
      include: { model: CartItems, include: [Pizza] },
    });
  }
  async getCartsByUserID(user_id: number) {
    return await this.cartModel.findOne({
      where: { user_id },
      include: { model: CartItems, include: [Pizza] },
    });
  }

  async createCart(cart: CreateCartDto) {
    const cartExists = await Cart.findOne({ where: { user_id: cart.user_id } });
    if (cartExists) {
      return cartExists;
    }
    return await Cart.create({ ...cart });
  }
  async addCartItems(cartItem: CreateCartItemDto, cart_id: number) {
    return await this.cartItemsModel.create({ ...cartItem, cart_id });
  }
  async removeCart(cart_id: number) {
    return await this.cartModel.destroy({ where: { cart_id } });
  }
  async removeCartItem(id: number) {
    return await this.cartItemsModel.destroy({ where: { id } });
  }
}
