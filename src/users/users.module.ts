import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModel } from './users.model';
import { RolesModel } from 'src/roles/roles.model';
import { UsersRolesModel } from 'src/roles/users-roles.model';
import { RolesModule } from 'src/roles/roles.module';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { PostsModel } from 'src/posts/posts.model';

@Module({
  controllers: [UsersController],
  providers: [UsersService, AuthService],
  imports: [
    SequelizeModule.forFeature([
      UsersModel,
      RolesModel,
      UsersRolesModel,
      PostsModel,
    ]),
    RolesModule,
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
})
export class UsersModule {}
