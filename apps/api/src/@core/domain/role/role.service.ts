import { Role } from "./role";
import { RoleRepository } from "./role.repository";

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