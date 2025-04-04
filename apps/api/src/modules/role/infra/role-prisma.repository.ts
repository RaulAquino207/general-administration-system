import { Role } from "../domain/entities/role";
import { RoleRepository } from "../domain/repositories/role.repository";

export class RolePrismaRepository implements RoleRepository {
    insert(role: Role): Promise<void> {
        throw new Error("Method not implemented.");
    }
    updateById(id: string, data: Partial<Role>): Promise<Role> {
        throw new Error("Method not implemented.");
    }
    selectAll(): Promise<Role[]> {
        throw new Error("Method not implemented.");
    }

}