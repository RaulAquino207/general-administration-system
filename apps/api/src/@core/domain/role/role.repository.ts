import { Role } from "./role";

export interface RoleRepository {
    create(role: Role): Promise<void>;
    findAll(): Promise<Role[]>;
}