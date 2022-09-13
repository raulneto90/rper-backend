import AppError from "@shared/errors/AppError";
import FakeRpersRepository from "@modules/rpers/repositories/fakes/FakeRpersRepository"
import ListRpersService from "./ListRpersService";

let fakeRpersRepository: FakeRpersRepository;
let listRpers: ListRpersService;

describe('ListRpers', () => {
    beforeEach(() => {
        fakeRpersRepository = new FakeRpersRepository();

        listRpers = new ListRpersService(fakeRpersRepository);
    });

    it('should be able to list all rpers', async () => {
        const rper1 = await fakeRpersRepository.create({
            name: 'Fight for the water supply',
            coordinator_id: '12345'
        });

        const rper2 = await fakeRpersRepository.create({
            name: 'Florida Cattlemen Association',
            coordinator_id: '54321'
        });

        const rpersList = await listRpers.execute();

        expect(rpersList).toEqual([rper1, rper2]);
    })

    it('should throw error if there is no rpers registered', async () => {
        await expect(
            listRpers.execute(),
        ).rejects.toBeInstanceOf(AppError);
    })

})