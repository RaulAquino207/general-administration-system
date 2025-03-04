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
    }
  
    private hasCircularReference(newChild: Group): boolean {
      let current: Group | undefined = this;
      while (current) {
        if (current.id === newChild.id) return true;
        current = current.parent;
      }
      return false;
    }
  }