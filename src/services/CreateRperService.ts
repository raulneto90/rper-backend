import { getCustomRepository } from 'typeorm'
import Rper from '../models/Rper';
import RpersRepository from '../repositories/RpersRepository';

interface RequestDTO {
    name: string;
    coordinator_id: string;
}


class CreateRperService {
    public async execute({ name, coordinator_id }: RequestDTO): Promise<Rper> {
        const rpersRepository = getCustomRepository(RpersRepository);
        const findRperWithSameName = await rpersRepository.findRperByName(name);

        if (findRperWithSameName) {
            throw Error("RPER with same name already exists.");
        }

        const rper = rpersRepository.create({
            name,
            coordinator_id,
        });

        await rpersRepository.save(rper);

        return rper;
    }
}

export default CreateRperService;