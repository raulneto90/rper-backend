import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
    it('should be able to create a new user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        const user = await createUser.execute({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        expect(user).toHaveProperty('id');
    });

    it('should not be able to create a new user with same email', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        await createUser.execute({ name: 'John Doe', email: 'johndoe@example.com', password: '123456' });
        expect(createUser.execute({ name: 'John Doe Two', email: 'johndoe@example.com', password: '654321' })).rejects.toBeInstanceOf(AppError);
    });

    it('should not allow the password to be empty', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const createUser = new CreateUserService(fakeUsersRepository);

        expect(createUser.execute({ name: 'John Doe Two', email: 'johndoe@example.com', password: '' })).rejects.toBeInstanceOf(AppError);
    });
});