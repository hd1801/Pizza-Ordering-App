import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

@Table
export class User extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  user_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  email: string;
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;
  @HasMany(() => Order, { onDelete: 'CASCADE' })
  orders: Order[];
}
