import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModel } from './roles.model';
import { UsersModel } from 'src/users/users.model';
import { UsersRolesModel } from './users-roles.model';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    SequelizeModule.forFeature([RolesModel, UsersModel, UsersRolesModel]),
  ],
  exports: [RolesService],
})
export class RolesModule {}
