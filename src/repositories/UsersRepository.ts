import User from '../models/User';
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(User)
class UsersRepository extends Repository<User>{
    public async findUserByEmail(email: string): Promise<User | null> {
        const findUserByEmail = await this.findOne({
            where: { email },
        });

        return findUserByEmail || null;
    }

}

export default UsersRepository;