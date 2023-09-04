
import { inject, injectable } from "inversify";
import { createHash } from 'crypto';

import { UsersRepository } from "../repositories";

@injectable()
export class UsersService {

    constructor(
        @inject(UsersRepository) protected readonly usersRepository: UsersRepository,
    ) {}

    public async createUser(name: string, email: string, password: string) {
        password = createHash('SHA512')
            .update(password, 'hex')
            .digest('hex')
            .toString();

        return this.usersRepository.createUser(name, email, password);
    }

    public async getUserById(userId: string) {
        return this.usersRepository.getUserById(userId);
    }

}
