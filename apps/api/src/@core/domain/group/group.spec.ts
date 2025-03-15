import { Group } from "./group";
import { User } from "../user/user";

describe('Group', () => {
  let group: Group;
  let user: User;

  beforeEach(() => {
    group = new Group('1', 'Admin');
    user = new User('1', 'John Doe', 'john@example.com', 'password123');
  });

  it('should create a group with name and ID', () => {
    expect(group.getId()).toBe('1');
    expect(group.getName()).toBe('Admin');
  });

  it('should add a user to the group and ensure bidirectional consistency', () => {
    group.addUser(user);

    expect(group.getUsers()).toContain(user);
    expect(user.getGroups()).toContain(group);
  });

  it('should remove a user from the group and ensure bidirectional consistency', () => {
    group.addUser(user);
    group.removeUser(user);

    expect(group.getUsers()).not.toContain(user);
    expect(user.getGroups()).not.toContain(group);
  });

  it('should throw an error when removing a user that is not in the group', () => {
    expect(() => group.removeUser(user)).toThrowError('User does not belong to this group.');
  });

  it('should not allow cyclic group hierarchy', () => {
    const childGroup = new Group('2', 'Sub Admin');
    
    group.addChild(childGroup);
    
    expect(() => childGroup.addChild(group)).toThrowError('Hierarchy cycle detected.');
  });

  it('should add a child group', () => {
    const childGroup = new Group('2', 'Sub Admin');
    
    group.addChild(childGroup);
    
    expect(group.getChildren()).toContain(childGroup);
    expect(childGroup.getParent()).toBe(group);
  });

  it('should remove a child group', () => {
    const childGroup = new Group('2', 'Sub Admin');

    group.addChild(childGroup);
    group.removeChild(childGroup);

    expect(group.getChildren()).not.toContain(childGroup);
    expect(childGroup.getParent()).toBeUndefined();
  });

  it('should throw an error when removing a non-existent child group', () => {
    const childGroup = new Group('2', 'Sub Admin');

    expect(() => group.removeChild(childGroup)).toThrowError('This group is not a child of this group.');
  });
});