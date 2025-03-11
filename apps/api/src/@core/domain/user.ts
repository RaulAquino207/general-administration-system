import { Group } from './group';
import { Role } from './role';

export class User {
  private readonly id: string;
  private readonly name: string;
  private readonly email: string;
  private password: string;
  private readonly groups: Set<Group> = new Set();
  private readonly roles: Set<Role> = new Set();

  constructor(id: string, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getGroups(): Group[] {
    return Array.from(this.groups);
  }

  getRoles(): Role[] {
    return Array.from(this.roles);
  }

  getPassword(): string {
    return this.password;
  }

  changePassword(newPassword: string): void {
    if (newPassword.length < 6) {
      throw new Error('The password must be at least 6 characters long.');
    }
    this.password = newPassword;
  }

  addGroup(group: Group, updateGroup = true): void {
    if ([...this.groups].some((g) => g.getId() === group.getId())) {
      return;
    }

    this.groups.add(group);

    if (updateGroup) {
      group.addUser(this, false);
    }
  }

  removeGroup(group: Group, updateGroup = true): void {
    const foundGroup = [...this.groups].find(
      (g) => g.getId() === group.getId()
    );

    if (!foundGroup) {
      throw new Error('User does not belong to this group.');
    }

    this.groups.delete(foundGroup);

    if (updateGroup) {
      foundGroup.removeUser(this, false);
    }
  }

  assignRole(role: Role): void {
    this.roles.add(role);
  }

  revokeRole(role: Role): void {
    if (!this.roles.has(role)) {
      throw new Error('User does not have this role.');
    }
    this.roles.delete(role);
  }
}
