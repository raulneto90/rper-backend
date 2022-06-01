import { getCustomRepository } from 'typeorm'
import User from '../models/User';
import UsersRepository from '../repositories/UsersRepository';

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
        const usersRepository = getCustomRepository(UsersRepository);
        const findUserWithSameEmail = await usersRepository.findUserByEmail(email);

        if (findUserWithSameEmail) {
            throw Error("Email already used.");
        }

        const user = usersRepository.create({
            name,
            email,
            password,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;