import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Cart extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  cart_id: number;
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;
  @HasMany(() => CartItems)
  CartItems: CartItems[];
}

@Table
export class CartItems extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER })
  cart_id: number;
  @Column({ type: DataType.INTEGER })
  pizza_id: number;
}
