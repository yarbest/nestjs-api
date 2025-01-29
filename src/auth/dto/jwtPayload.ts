import { RolesModel } from 'src/roles/roles.model';

export interface JwtPayload {
  id: number;
  email: string;
  roles: RolesModel[];
}
