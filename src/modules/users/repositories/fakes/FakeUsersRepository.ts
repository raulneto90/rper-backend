import { v4 as uuid } from 'uuid';
import User from '../../infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository'
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async findById(id: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.user_id === id);
        return findUser;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const findUser = this.users.find(user => user.email === email);
        return findUser;
    }

    public async create(userData: ICreateUserDTO): Promise<User> {
        const user = new User();
        Object.assign(user, { user_id: uuid() }, userData);
        this.users.push(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        const findIndex = this.users.findIndex(findUser => findUser.user_id === user.user_id);
        this.users[findIndex] = user;
        return user;
    }

}

export default FakeUsersRepository;