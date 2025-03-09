import { Group } from "./group";
import { Role } from "./role";

export class User {
  constructor(
    public readonly id: string,
    public username: string,
    public email: string,
    public groups: Group[] = [],
    public roles: Role[] = []
  ) {}

  hasRole(roleName: string): boolean {
    if (this.roles.some(role => role.name === roleName)) return true;

    return this.groups.some(group => 
      group.hasRoleInHierarchy(roleName)
    );
  }
}