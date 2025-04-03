import { Role } from "../../domain/entities/role";
import { RoleRepository } from "../../domain/repositories/role.repository";

export class RoleService {
    constructor(private readonly roleRepository: RoleRepository) {}

    async create(name: string) {
        const role = new Role(name);
        await this.roleRepository.insert(role);
    }

    async update(id: string, data: Partial<Role>) {
        await this.roleRepository.updateById(id, data);
    }

    async findAll() {
        await this.roleRepository.selectAll();
    }
}