import { Group } from "./group";

describe('Group Entity', () => {
    let parentGroup: Group;
    let childGroup: Group;
  
    beforeEach(() => {
      parentGroup = new Group('1', 'Parent Group');
      childGroup = new Group('2', 'Child Group');
    });
  
    it('should create a group correctly', () => {
      expect(parentGroup.getId()).toBe('1');
      expect(parentGroup.getName()).toBe('Parent Group');
    });
  
    it('should add and remove subgroups correctly', () => {
      parentGroup.addChild(childGroup);
      expect(parentGroup.getChildren()).toContain(childGroup);
      expect(childGroup.getParent()).toBe(parentGroup);
  
      parentGroup.removeChild(childGroup);
      expect(parentGroup.getChildren()).not.toContain(childGroup);
      expect(childGroup.getParent()).toBeUndefined();
    });
  
    it('should throw an error when adding a cycle in the hierarchy', () => {
      parentGroup.addChild(childGroup);
      expect(() => childGroup.addChild(parentGroup)).toThrowError('Hierarchy cycle detected.');
    });
  
    it('should throw an error when removing a subgroup that does not belong', () => {
      const otherGroup = new Group('3', 'Other Group');
      expect(() => parentGroup.removeChild(otherGroup)).toThrowError('This group is not a child of this group.');
    });
  
    it('should add and remove users correctly', () => {
      parentGroup.addUser('user1');
      expect(parentGroup.getUsers()).toContain('user1');
  
      parentGroup.removeUser('user1');
      expect(parentGroup.getUsers()).not.toContain('user1');
    });
  
    it('should throw an error when removing a user who does not belong', () => {
      expect(() => parentGroup.removeUser('user1')).toThrowError('User does not belong to this group.');
    });
  });