import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from 'sequelize-typescript';
import { Pizza } from 'src/pizza/pizza.model';
import { User } from 'src/user/user.model';

@Table
export class Cart extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  cart_id: number;
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, unique: true })
  user_id: number;
  @HasMany(() => CartItems, { onDelete: 'CASCADE' })
  CartItems: CartItems[];
}
@Table
export class CartItems extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cart_id: number;
  @ForeignKey(() => Pizza)
  @Column({ type: DataType.INTEGER })
  pizza_id: number;
  @BelongsTo(() => Pizza)
  pizza: Pizza;
}
