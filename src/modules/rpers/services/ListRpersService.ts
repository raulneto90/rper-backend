import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IRpersRepository from '@modules/rpers/repositories/IRpersRepository';

import Rper from '@modules/rpers/infra/typeorm/entities/Rper';


@injectable()
class ListRpersService {
    constructor(
        @inject('RpersRepository')
        private rpersRepository: IRpersRepository,
    ) { }

    public async execute(): Promise<Rper[]> {
        const rpers = await this.rpersRepository.findAllRpers();

        if (rpers.length === 0) {
            throw new AppError('No Rpers Found.');
        }

        return rpers;
    }
}

export default ListRpersService;