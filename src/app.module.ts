import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';

import { UsersModule } from './users/users.module';
import { UsersModel } from './users/users.model';
import { RolesModule } from './roles/roles.module';
import { RolesModel } from './roles/roles.model';
import { UsersRolesModel } from './roles/users-roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { PostsModel } from './posts/posts.model';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),

    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'static'),
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [UsersModel, RolesModel, UsersRolesModel, PostsModel],
      autoLoadModels: true, // squalize creates tables in BD based on models we create
    }),

    UsersModule,

    RolesModule,

    AuthModule,

    PostsModule,

    FilesModule,
  ],
})
export class AppModule {
  constructor() {}
}
