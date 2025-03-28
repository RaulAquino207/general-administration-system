import { v4 as uuid } from 'uuid';

export class Role {
  private readonly id: string;
  private readonly name: string;

  constructor(name: string) {
    this.id = uuid();
    this.name = name;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }
}