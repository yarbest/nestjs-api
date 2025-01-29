import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { UsersModel } from 'src/users/users.model';
import { UsersRolesModel } from './users-roles.model';

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({
  tableName: 'roles',
})
export class RolesModel extends Model<RolesModel, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    primaryKey: true,
    unique: true,
    type: DataType.INTEGER,
    autoIncrement: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'unique role for user' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  value: string;

  @ApiProperty({
    example: 'some administrator',
    description: 'role description',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => UsersModel, () => UsersRolesModel)
  users: UsersModel[];
}
