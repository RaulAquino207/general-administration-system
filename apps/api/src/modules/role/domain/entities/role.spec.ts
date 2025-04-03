import { Role } from './role';

describe('Role Entity', () => {
    it('should create a role correctly', () => {
      const role = new Role('Admin');
      expect(role.getName()).toBe('Admin');
    });
  });