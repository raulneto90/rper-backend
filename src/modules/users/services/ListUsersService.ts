import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';


@injectable()
class ListUsersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute(): Promise<User[]> {
        const users = await this.usersRepository.findAllUsers();

        if (users.length === 0) {
            throw new AppError('No user found.');
        }

        return users;
    }
}

export default ListUsersService;