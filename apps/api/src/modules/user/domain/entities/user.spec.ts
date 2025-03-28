import { Group } from "@api/modules/group/domain/entities/group";
import { Role } from "@api/modules/role/domain/entities/role";
import { User } from "@api/modules/user/domain/entities/user";

describe('User', () => {
  let user: User;
  let group: Group;
  let role: Role;

  beforeEach(() => {
    user = new User('1', 'John Doe', 'john@example.com', 'password123');
    group = new Group('1', 'Admin');
    role = new Role('Admin Role');
  });

  it('should create a user with ID, name, email, and password', () => {
    expect(user.getId()).toBe('1');
    expect(user.getName()).toBe('John Doe');
    expect(user.getEmail()).toBe('john@example.com');
    expect(user.getPassword()).toBe('password123');
  });

  it('should change the user password', () => {
    user.changePassword('newpassword');
    expect(user.getPassword()).toBe('newpassword');
  });

  it('should not allow a password shorter than 6 characters', () => {
    expect(() => user.changePassword('123')).toThrowError('The password must be at least 6 characters long.');
  });

  it('should add a group to the user and ensure bidirectional consistency', () => {
    user.addGroup(group);

    expect(user.getGroups()).toContain(group);
    expect(group.getUsers()).toContain(user);
  });

  it('should remove a group from the user and ensure bidirectional consistency', () => {
    user.addGroup(group);
    user.removeGroup(group);

    expect(user.getGroups()).not.toContain(group);
    expect(group.getUsers()).not.toContain(user);
  });

  it('should throw an error when removing a group that the user is not a part of', () => {
    expect(() => user.removeGroup(group)).toThrowError('User does not belong to this group.');
  });

  it('should assign a role to the user', () => {
    user.assignRole(role);

    expect(user.getRoles()).toContain(role);
  });

  it('should revoke a role from the user', () => {
    user.assignRole(role);
    user.revokeRole(role);

    expect(user.getRoles()).not.toContain(role);
  });

  it('should throw an error when revoking a role the user does not have', () => {
    expect(() => user.revokeRole(role)).toThrowError('User does not have this role.');
  });
});