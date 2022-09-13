import AppError from "@shared/errors/AppError";
import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository"
import ListUsersService from "./ListUsersService";

let fakeUsersRepository: FakeUsersRepository;
let listUsers: ListUsersService;

describe('ListUsers', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();

        listUsers = new ListUsersService(fakeUsersRepository);
    });

    it('should be able to list all Users', async () => {
        const user1 = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'johndoe@example.com',
            password: '123456',
        });

        const user2 = await fakeUsersRepository.create({
            name: 'John Doe2',
            email: 'johndoe2@example.com',
            password: '123456',
        });

        const usersList = await listUsers.execute();

        expect(usersList).toEqual([user1, user2]);
    })

    it('should throw error if there is no Users registered', async () => {
        await expect(
            listUsers.execute(),
        ).rejects.toBeInstanceOf(AppError);
    })

})