// import User from '../infra/typeorm/entities/User';
// import { EntityRepository, Repository } from 'typeorm'

// @EntityRepository(User)
// class UsersRepository extends Repository<User>{
//     public async findUserByEmail(email: string): Promise<User | null> {
//         const findUserByEmail = await this.findOne({
//             where: { email },
//         });

//         return findUserByEmail || null;
//     }

// }

// export default UsersRepository;


import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import { getRepository, Repository } from 'typeorm'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });
        return user;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(userData);
        await this.ormRepository.save(user);
        return (user);
    }

    public async save(user: User): Promise<User> {
        return this.ormRepository.save(user);
    }

    public async findAllUsers(): Promise<User[]> {
        const users = await this.ormRepository.find();
        const usersNoPassword = users.map(el => {
            let userNoPassword = Object.assign({}, {
                name: el.name,
                avatar: el.avatar,
                created_at: el.created_at,
                email: el.email,
                updated_at: el.updated_at,
                user_id: el.user_id,
                password: el.password
            });

            delete userNoPassword.password;

            return userNoPassword;
        });

        return usersNoPassword;
    }
}

export default UsersRepository;