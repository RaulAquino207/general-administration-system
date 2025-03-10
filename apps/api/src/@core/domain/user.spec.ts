import { Group } from './group';
import { Role } from './role';
import { User } from './user';

describe('User Entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User('1', 'Monalisa', 'monalisa@email.com', 'password123');
  });

  it('should create a user with a valid name and email', () => {
    expect(user.getId()).toBe('1');
    expect(user.getName()).toBe('Monalisa');
    expect(user.getEmail()).toBe('monalisa@email.com');
  });

  it('should change the password correctly', () => {
    user.changePassword('newpass123');
    expect(() => user.changePassword('123')).toThrowError('The password must be at least 6 characters long.');
  });

  it('should add and remove a group correctly', () => {
    const group = new Group('10', 'Admins');
    user.addGroup(group);
    expect(user.getGroups()).toContain(group);

    user.removeGroup(group);
    expect(user.getGroups()).not.toContain(group);
  });

  it('should throw an error when removing a non-existent group', () => {
    const group = new Group('10', 'Admins');
    expect(() => user.removeGroup(group)).toThrowError('User does not belong to this group.');
  });

  it('should assign and revoke roles correctly', () => {
    const role = new Role('100', 'Admin');
    user.assignRole(role);
    expect(user.getRoles()).toContain(role);

    user.revokeRole(role);
    expect(user.getRoles()).not.toContain(role);
  });

  it('should throw an error when revoking a non-existent role', () => {
    const role = new Role('100', 'Admin');
    expect(() => user.revokeRole(role)).toThrowError('User does not have this role.');
  });
});