import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
    it('should be able to update avatar from user without any avatar yet', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.user_id,
            avatarFilename: 'mock.jpg',
        });

        expect(user.avatar).toBe('mock.jpg');
    });

    it('should should not be able to update avatar from non existing user', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        expect(
            updateUserAvatar.execute({
                user_id: 'non-existing-user',
                avatarFilename: 'mock.jpg',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be delete old avatar when updating to a new one', async () => {
        const fakeUsersRepository = new FakeUsersRepository();
        const fakeStorageProvider = new FakeStorageProvider();

        const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

        const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456'
        });

        await updateUserAvatar.execute({
            user_id: user.user_id,
            avatarFilename: 'mock.jpg',
        });

        await updateUserAvatar.execute({
            user_id: user.user_id,
            avatarFilename: 'mock2.jpg',
        });

        expect(deleteFile).toHaveBeenCalledWith('mock.jpg')
        expect(user.avatar).toBe('mock2.jpg');
    });
});