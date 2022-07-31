import FakeRpersRepository from '../repositories/fakes/FakeRpersRepository'
import CreateRperService from './CreateRperService';
import AppError from '@shared/errors/AppError';


describe('CreateRper', () => {
    it('should be able to create a new RPER', async () => {
        const fakeRpersRepository = new FakeRpersRepository();
        const createRper = new CreateRperService(fakeRpersRepository);

        const rper = await createRper.execute({ name: "rper name example one", coordinator_id: "123456" });

        expect(rper).toHaveProperty('id');
        expect(rper.coordinator_id).toBe('123456');
        expect(rper.name).toBe('rper name example one');
    });

    it('should not allow two RPERs with the same name', async () => {
        const fakeRpersRepository = new FakeRpersRepository();
        const createRper = new CreateRperService(fakeRpersRepository);

        await createRper.execute({ name: "rper name example one", coordinator_id: "123456" });

        expect(createRper.execute({ name: "rper name example one", coordinator_id: "789012" })).rejects.toBeInstanceOf(AppError);
    });
});

