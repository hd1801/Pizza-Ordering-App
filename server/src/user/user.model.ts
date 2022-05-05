import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

@Table
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  user_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  user_name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(() => Order)
  orders: Order[];
}
