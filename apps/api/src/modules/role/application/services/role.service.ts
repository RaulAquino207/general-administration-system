import { Role } from "@api/modules/role/domain/entities/role";
import { RoleRepository } from "@api/modules/role/domain/repositories/role.repository";

export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async create() {
        const role = new Role('test');
        await this.roleRepository.create(role);
    }

    async findAll() {
        await this.roleRepository.findAll();
    }
}