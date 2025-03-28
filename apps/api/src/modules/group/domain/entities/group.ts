import { User } from "@api/modules/user/domain/entities/user";

export class Group {
  private id: string;
  private name: string;
  private parent?: Group;
  private children: Set<Group> = new Set();
  private users: Set<User> = new Set();

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

  getUsers(): User[] {
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

  addUser(user: User, updateUser = true): void {
    if ([...this.users].some((u) => u.getId() === user.getId())) {
      return;
    }

    this.users.add(user);

    if (updateUser) {
      user.addGroup(this, false);
    }
  }

  removeUser(user: User, updateUser = true): void {
    const foundUser = [...this.users].find((u) => u.getId() === user.getId());

    if (!foundUser) {
      throw new Error('User does not belong to this group.');
    }

    this.users.delete(foundUser);

    if (updateUser) {
      foundUser.removeGroup(this, false);
    }
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
