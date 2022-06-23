import User from '../infra/typeorm/entities/User';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUsersRepository';

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
        private usersRepository: IUsersRepository,) { }

    public async execute({ email, password }: IRequestDTO): Promise<IResponseDTO> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Incorrect email/password combination.", 401);
        }

        const passwordMatched = await compare(password, user.password as string);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination.", 401);
        }
        //User Authenticated. 

        const { secret, expiresIn } = authConfig.jwt;
        const token = sign({}, secret, {
            subject: user.user_id,
            expiresIn: expiresIn,
        });

        return {
            user,
            token,
        };

    }
}

export default AuthenticateUserService;