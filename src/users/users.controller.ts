import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateUserDTO } from './dto/createUserDTO';
import { UsersService } from './users.service';
import { UsersModel } from './users.model';
import { RolesAuth } from 'src/auth/rolesAuth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddRoleDTO } from './dto/addRoleDTO';
import { AuthGuard } from 'src/auth/auth.guard';
import { BanUserDTO } from './dto/banUserDTO';
// import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: UsersModel })
  @UsePipes(ValidationPipe)
  @Post()
  createUser(@Body() userDTO: CreateUserDTO) {
    return this.usersService.createUser(userDTO);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UsersModel] })
  @UseGuards(AuthGuard)
  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @Post('role')
  addRole(@Body() addRoleDTO: AddRoleDTO) {
    return this.usersService.addRole(addRoleDTO);
  }

  @RolesAuth('ADMIN')
  @UseGuards(RolesGuard)
  @Post('ban')
  banUser(@Body() banUserDTO: BanUserDTO) {
    return this.usersService.banUser(banUserDTO);
  }
}
