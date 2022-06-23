import Rper from '../infra/typeorm/entities/Rper';
import IRpersRepository from '../repositories/IRpersRepository';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';


interface IRequestDTO {
    name: string;
    coordinator_id: string;
}

@injectable()
class CreateRperService {

    constructor(
        @inject('RpersRepository')
        private rpersRepository: IRpersRepository) { }

    public async execute({ name, coordinator_id }: IRequestDTO): Promise<Rper> {
        const findRperWithSameName = await this.rpersRepository.findRperByName(name);

        if (findRperWithSameName) {
            throw new AppError("RPER with same name already exists.");
        }

        const rper = await this.rpersRepository.create({
            name,
            coordinator_id,
        });

        return rper;
    }
}

export default CreateRperService;