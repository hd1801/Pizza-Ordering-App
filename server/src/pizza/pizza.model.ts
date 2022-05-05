import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';

@Table
export class Pizza extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  pizza_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  crust_size: number;
  @HasMany(() => Ingredients)
  ingredients: Ingredients[];
}

@Table
export class Ingredients extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  ingredient_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}

@Table
export class PizzaIngredients extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true })
  id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  pizza_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  ingredient_id: number;
}
