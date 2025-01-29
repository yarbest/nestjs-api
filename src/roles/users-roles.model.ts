import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UsersModel } from 'src/users/users.model';
import { RolesModel } from './roles.model';

// table for relation many-to-many between users and roles
@Table({
  tableName: 'users_roles',
  createdAt: false,
  updatedAt: false,
})
export class UsersRolesModel extends Model<UsersRolesModel> {
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => UsersModel)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => RolesModel)
  @Column({ type: DataType.INTEGER })
  roleId: string;
}
