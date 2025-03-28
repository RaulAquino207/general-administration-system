import { Role } from "@api/modules/role/domain/entities/role";

export interface RoleRepository {
    create(role: Role): Promise<void>;
    findAll(): Promise<Role[]>;
}