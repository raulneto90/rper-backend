import { getRepository } from 'typeorm'
import User from '../models/User';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth'

interface RequestDTO {
    email: string;
    password: string;
}

interface ResponseDTO {
    user: User;
    token: string;
}


class AuthenticateUserService {
    public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new Error("Incorrect email/password combination.");
        }

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new Error("Incorrect email/password combination.");
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