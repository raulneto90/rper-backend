import { getRepository, Repository } from 'typeorm';

import { ICreateRperSecondaryDataDTO } from '@modules/rpers/dtos/ICreateRperSecondaryDataDTO';
import { IRpersSecondaryDataRepository } from '@modules/rpers/repositories/IRpersSecondaryDataRepository';

import { RperSecondaryData } from '../entities/RperSecondaryData';

export class RpersSecondaryDataRepository
  implements IRpersSecondaryDataRepository
{
  private ormRepository: Repository<RperSecondaryData>;

  constructor() {
    this.ormRepository = getRepository(RperSecondaryData);
  }

  async create(data: ICreateRperSecondaryDataDTO): Promise<RperSecondaryData> {
    const secondaryData = this.ormRepository.create(data);

    await this.ormRepository.save(secondaryData);

    return secondaryData;
  }
}
