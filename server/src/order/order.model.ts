import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table
export class Order extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  order_id: number;
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;
  @HasMany(() => OrderItems)
  orderItems: OrderItems[];
}

@Table
export class OrderItems extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;
  @ForeignKey(() => Order)
  @Column({ type: DataType.INTEGER })
  order_id: number;
  @Column({ type: DataType.INTEGER })
  pizza_id: number;
}
