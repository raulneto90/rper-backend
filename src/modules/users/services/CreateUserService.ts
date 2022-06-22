// import { getCustomRepository } from 'typeorm'
// import UsersRepository from '../repositories/UsersRepository';

import { getRepository } from 'typeorm';
import User from '@modules/users/infra/typeorm/entities/User';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new AppError('Email address already been used.')
        }

        if (!password) {
            throw new AppError('A valid password must be inserted.')
        }

        const hashedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;