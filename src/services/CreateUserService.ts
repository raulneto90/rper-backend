// import { getCustomRepository } from 'typeorm'
// import UsersRepository from '../repositories/UsersRepository';

import { getRepository } from 'typeorm'
import User from '../models/User';
import { hash } from 'bcryptjs';

import AppError from '../errors/AppError';

interface RequestDTO {
    name: string;
    email: string;
    password: string;
}


class CreateUserService {
    //Dependecy Inversion - SOLID
    // private usersRepository: UsersRepository;
    // constructor(usersRepository: UsersRepository) {
    //     this.usersRepository = usersRepository;
    // }

    public async execute({ name, email, password }: RequestDTO): Promise<User> {
        //Using Cystom Repository
        //const usersRepository = getCustomRepository(UsersRepository);
        //const findUserWithSameEmail = await usersRepository.findUserByEmail(email);
        // if (findUserWithSameEmail) {
        //     throw Error("Email already used.");
        // }
        // const user = usersRepository.create({
        //     name,
        //     email,
        //     password,
        // });
        // await usersRepository.save(user);
        // return user;

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });
        if (checkUserExists) {
            throw new AppError('Email address already been used.')
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