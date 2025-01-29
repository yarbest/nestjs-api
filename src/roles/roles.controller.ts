import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDTO } from './dto/createRoleDTO';

@Controller('roles')
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  createRole(@Body() createRoleDTO: CreateRoleDTO) {
    return this.rolesService.createRole(createRoleDTO);
  }

  @Get('/:value')
  getRoleByValue(@Param('value') value: string) {
    return this.rolesService.getRoleByValue(value);
  }
}
