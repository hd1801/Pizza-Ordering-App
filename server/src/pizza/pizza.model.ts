import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';

@Table
export class Pizza extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  pizza_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  crust_size: number;
  @Column({ type: DataType.REAL })
  price: number;
  @HasMany(() => PizzaIngredients, { onDelete: 'CASCADE' })
  ingredients: PizzaIngredients[];
}

@Table
export class Ingredients extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  ingredient_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.REAL })
  price: number;
}

@Table
export class PizzaIngredients extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;
  @ForeignKey(() => Pizza)
  @Column({ type: DataType.INTEGER, allowNull: false })
  pizza_id: number;
  @ForeignKey(() => Ingredients)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ingredient_id: number;
}
