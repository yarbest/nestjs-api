import { IsNumber, IsString } from 'class-validator';

export class AddRoleDTO {
  @IsString({ message: 'must be a string' })
  readonly value: string;
  @IsNumber({}, { message: 'must be a number' })
  readonly userId: number;
}
