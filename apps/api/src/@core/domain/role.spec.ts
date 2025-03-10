import { Role } from "./role";

describe('Role Entity', () => {
    it('should create a role correctly', () => {
      const role = new Role('1', 'Admin');
      expect(role.getId()).toBe('1');
      expect(role.getName()).toBe('Admin');
    });
  });