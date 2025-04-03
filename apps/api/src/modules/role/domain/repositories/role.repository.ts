import { Role } from "@api/modules/role/domain/entities/role";

export interface RoleRepository {
    insert(role: Role): Promise<void>;
    updateById(id: string, data: Partial<Role>): Promise<Role>;
    selectAll(): Promise<Role[]>;
}