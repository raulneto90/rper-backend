import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user).toHaveProperty('user_id');
    });

    it('should not be able to create a new user with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });
        expect(createUser.execute({ name: 'John Doe Two', email: 'johndoe@example.com', password: '654321' })).rejects.toBeInstanceOf(AppError);
    });

    it('should not allow the password to be empty', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeHashProvider = new FakeHashProvider();
        const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

        expect(createUser.execute({ name: 'John Doe Two', email: 'johndoe@example.com', password: '' })).rejects.toBeInstanceOf(AppError);
    });
});