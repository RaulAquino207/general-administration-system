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
      return this.roles.some(role => role.name === roleName) ||
             this.groups.some(group => group.roles.some(role => role.name === roleName));
    }
  }