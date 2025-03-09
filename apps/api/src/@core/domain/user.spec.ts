import { User } from './user';
import { Group } from './group';
import { Role } from './role';

describe('User Entity', () => {
  const mockRole = new Role('role-1', 'admin', ['manage_users']);
  const mockParentGroup = new Group('group-1', 'Parent Group');
  const mockChildGroup = new Group('group-2', 'Child Group', mockParentGroup);

  beforeEach(() => {
    mockParentGroup.roles = [mockRole];
  });

  describe('hasRole()', () => {
    it('should return true when user has direct role', () => {
      const user = new User('user-1', 'john', 'john@test.com', [], [mockRole]);
      expect(user.hasRole('admin')).toBe(true);
    });

    it('should return true when role comes from group', () => {
      const user = new User('user-1', 'john', 'john@test.com', [mockParentGroup]);
      expect(user.hasRole('admin')).toBe(true);
    });

    it('should return true when role comes from parent group', () => {
      const user = new User('user-1', 'john', 'john@test.com', [mockChildGroup]);
      expect(user.hasRole('admin')).toBe(true);
    });

    it('should return false when no matching roles', () => {
      const user = new User('user-1', 'john', 'john@test.com');
      expect(user.hasRole('non_existent')).toBe(false);
    });
  });

  describe('Groups Management', () => {
    it('should add multiple groups correctly', () => {
      const user = new User('user-1', 'john', 'john@test.com');
      user.groups = [mockParentGroup, mockChildGroup];
      expect(user.groups).toHaveLength(2);
      expect(user.groups[0].name).toBe('Parent Group');
    });
  });
});