import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Pizza } from 'src/pizza/pizza.model';
import { User } from 'src/user/user.model';

@Table
export class Order extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  order_id: number;
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;
  @HasMany(() => OrderItems, { onDelete: 'CASCADE' })
  orderItems: OrderItems[];
}

@Table
export class OrderItems extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;
  @ForeignKey(() => Pizza)
  @Column({ type: DataType.INTEGER })
  pizza_id: number;
  @BelongsTo(() => Pizza)
  pizza: Pizza;
}
