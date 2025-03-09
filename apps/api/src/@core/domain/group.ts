import { Role } from "./role";

export class Group {
  constructor(
    public readonly id: string,
    public name: string,
    public parent?: Group,
    public children: Group[] = [],
    public roles: Role[] = []
  ) {}

  addChild(child: Group): void {
    if (this.hasCircularReference(child)) {
      throw new Error('Circular reference detected');
    }
    this.children.push(child);
    child.parent = this;
  }

  hasRoleInHierarchy(roleName: string): boolean {
    if (this.roles.some(role => role.name === roleName)) return true;

    let currentParent = this.parent;
    while (currentParent) {
      if (currentParent.roles.some(role => role.name === roleName)) return true;
      currentParent = currentParent.parent;
    }
    return false;
  }

  private hasCircularReference(newChild: Group): boolean {
    let current: Group | undefined = this as Group;
    while (current) {
      if (current.id === newChild.id) return true;
      current = current.parent;
    }
    return false;
  }
}