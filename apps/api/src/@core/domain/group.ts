export class Group {
  private id: string;
  private name: string;
  private parent?: Group;
  private children: Set<Group> = new Set();
  private users: Set<string> = new Set(); // IDs of users belonging to the group

  constructor(id: string, name: string, parent?: Group) {
    this.id = id;
    this.name = name;
    this.parent = parent;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getParent(): Group | undefined {
    return this.parent;
  }

  getChildren(): Group[] {
    return Array.from(this.children);
  }

  getUsers(): string[] {
    return Array.from(this.users);
  }

  addChild(child: Group): void {
    if (child.getId() === this.id || this.hasAncestor(child)) {
      throw new Error('Hierarchy cycle detected.');
    }
    child.parent = this;
    this.children.add(child);
  }

  removeChild(child: Group): void {
    if (!this.children.has(child)) {
      throw new Error('This group is not a child of this group.');
    }
    this.children.delete(child);
    child.parent = undefined;
  }

  addUser(userId: string): void {
    this.users.add(userId);
  }

  removeUser(userId: string): void {
    if (!this.users.has(userId)) {
      throw new Error('User does not belong to this group.');
    }
    this.users.delete(userId);
  }

  private hasAncestor(group: Group): boolean {
    let current = this.parent;
    while (current) {
      if (current.id === group.id) {
        return true;
      }
      current = current.parent;
    }
    return false;
  }
}
