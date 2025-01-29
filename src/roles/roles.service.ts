import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/createRoleDTO';
import { InjectModel } from '@nestjs/sequelize';
import { RolesModel } from './roles.model';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RolesModel) private rolesRepository: typeof RolesModel,
  ) {}

  async createRole(createRoleDTO: CreateRoleDTO) {
    const createdRole = await this.rolesRepository.create(createRoleDTO);
    return createdRole;
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({ where: { value } });
    return role;
  }
}
