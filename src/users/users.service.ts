import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersModel } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDTO } from './dto/createUserDTO';
import { RolesService } from 'src/roles/roles.service';
import { AddRoleDTO } from './dto/addRoleDTO';
import { BanUserDTO } from './dto/banUserDTO';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UsersModel) private usersRepository: typeof UsersModel,
    private rolesService: RolesService,
  ) {}

  async createUser(createUserDTO: CreateUserDTO) {
    const createdUser = await this.usersRepository.create(createUserDTO);
    const userRole = await this.rolesService.getRoleByValue('USER');
    if (userRole) {
      await createdUser.$set('roles', [userRole.id]);
      createdUser.roles = [userRole]; // $set changes field in DB, but we also need to use it in object
    }
    return createdUser;
  }

  async getAllUsers() {
    const users = this.usersRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDTO: AddRoleDTO) {
    const user = await this.usersRepository.findByPk(addRoleDTO.userId);
    const role = await this.rolesService.getRoleByValue(addRoleDTO.value);

    if (!user || !role) {
      throw new NotFoundException('User or role not found');
    }

    await user.$add('roles', role.id);
    return addRoleDTO;
  }

  async banUser(banUserDTO: BanUserDTO) {
    const user = await this.usersRepository.findByPk(banUserDTO.userId);
    if (!user) throw new NotFoundException('User not found');
    user.banned = true;
    user.banReason = banUserDTO.banReason;
    await user.save();
    return banUserDTO;
  }
}
