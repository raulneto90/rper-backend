import User from '../infra/typeorm/entities/User';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import AppError from '@shared/errors/AppError';

interface IRequestDTO {
    email: string;
    password: string;
}

interface IResponseDTO {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) { }

    public async execute({ email, password }: IRequestDTO): Promise<IResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password as string);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination.", 401);
        }
        //User Authenticated.

        const { secret, expiresIn } = authConfig.jwt;


        const token = sign({}, secret, {
            expiresIn: expiresIn,
            subject: user.user_id,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;